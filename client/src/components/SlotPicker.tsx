import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { TimeSlot } from '@/stores/useBookingStore';
import { format, addDays, setHours, setMinutes, isAfter } from 'date-fns';

// Time slots configuration
const TIME_SLOTS = [
  { start: 10, end: 12, label: '10:00 AM - 12:00 PM' },
  { start: 12, end: 14, label: '12:00 PM - 2:00 PM' },
  { start: 14, end: 16, label: '2:00 PM - 4:00 PM' },
  { start: 16, end: 18, label: '4:00 PM - 6:00 PM' },
];

interface SlotPickerProps {
  value?: TimeSlot;
  onChange: (slot: TimeSlot) => void;
}

export function SlotPicker({ value, onChange }: SlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>(value?.date || 'today');
  const [selectedTime, setSelectedTime] = useState<string>(value?.startTime || '');

  const today = new Date();
  const tomorrow = addDays(today, 1);

  const isSlotDisabled = (date: 'today' | 'tomorrow', startHour: number): boolean => {
    const slotDate = date === 'today' ? today : tomorrow;
    const slotTime = setMinutes(setHours(slotDate, startHour), 0);
    return isAfter(new Date(), slotTime);
  };

  const handleSlotSelect = (date: 'today' | 'tomorrow', timeSlot: typeof TIME_SLOTS[0]) => {
    const slotDate = date === 'today' ? today : tomorrow;
    const startTime = setMinutes(setHours(slotDate, timeSlot.start), 0);
    const endTime = setMinutes(setHours(slotDate, timeSlot.end), 0);

    const slot: TimeSlot = {
      date,
      startTime: `${timeSlot.start.toString().padStart(2, '0')}:00`,
      endTime: `${timeSlot.end.toString().padStart(2, '0')}:00`,
      startISO: startTime.toISOString(),
      endISO: endTime.toISOString(),
      label: `${format(slotDate, 'MMM dd')} • ${timeSlot.label}`
    };

    setSelectedDate(date);
    setSelectedTime(slot.startTime);
    onChange(slot);
  };

  const getAvailableSlotsCount = (date: 'today' | 'tomorrow'): number => {
    return TIME_SLOTS.filter(slot => !isSlotDisabled(date, slot.start)).length;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Choose Service Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              Select Date
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'today' as const, date: today, label: 'Today' },
                { key: 'tomorrow' as const, date: tomorrow, label: 'Tomorrow' }
              ].map(({ key, date, label }) => {
                const availableSlots = getAvailableSlotsCount(key);
                const isSelected = selectedDate === key;
                
                return (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDate(key)}
                    disabled={availableSlots === 0}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-emerald-500/40'
                        : availableSlots > 0
                        ? 'bg-white/5 border-white/20 hover:border-white/40'
                        : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    }`}
                    data-testid={`button-date-${key}`}
                  >
                    <div className="text-white font-medium">{label}</div>
                    <div className="text-gray-400 text-sm">
                      {format(date, 'MMM dd, yyyy')}
                    </div>
                    <div className="mt-2">
                      {availableSlots > 0 ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {availableSlots} slots available
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                          No slots available
                        </Badge>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              Select Time Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_SLOTS.map((timeSlot) => {
                const isDisabled = isSlotDisabled(selectedDate, timeSlot.start);
                const isSelected = selectedTime === `${timeSlot.start.toString().padStart(2, '0')}:00`;
                
                return (
                  <motion.button
                    key={timeSlot.label}
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    onClick={() => !isDisabled && handleSlotSelect(selectedDate, timeSlot)}
                    disabled={isDisabled}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-emerald-500/40'
                        : !isDisabled
                        ? 'bg-white/5 border-white/20 hover:border-white/40'
                        : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    }`}
                    data-testid={`button-slot-${timeSlot.start}-${timeSlot.end}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {timeSlot.label}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                          {isDisabled 
                            ? 'Not available' 
                            : isSelected 
                            ? 'Selected' 
                            : 'Available'
                          }
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selected Summary */}
          {value && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Selected Slot</p>
                  <p className="text-gray-300 text-sm">{value.label}</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  ✓ Confirmed
                </Badge>
              </div>
            </motion.div>
          )}

          {/* Important Notes */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-gray-300 text-sm">
              <strong>Service Duration:</strong> 1-2 hours depending on services selected
              <br />
              <strong>Note:</strong> Our mechanic will arrive at the selected time slot
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}