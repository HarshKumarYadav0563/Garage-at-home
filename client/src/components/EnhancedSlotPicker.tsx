import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { useBookingStore, TimeSlot } from '@/stores/useBookingStore';
import { useState, useEffect } from 'react';

export function EnhancedSlotPicker() {
  const { selectedSlot, setSelectedSlot } = useBookingStore();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Generate time slots for today and tomorrow
  useEffect(() => {
    const generateSlots = () => {
      const slots: TimeSlot[] = [];
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const timeSlots = [
        { start: '10:00', end: '12:00', label: '10 AM - 12 PM' },
        { start: '12:00', end: '14:00', label: '12 PM - 2 PM' },
        { start: '14:00', end: '16:00', label: '2 PM - 4 PM' },
        { start: '16:00', end: '18:00', label: '4 PM - 6 PM' },
      ];

      // Today's slots (exclude past times)
      const currentHour = today.getHours();
      timeSlots.forEach((timeSlot) => {
        const slotHour = parseInt(timeSlot.start.split(':')[0]);
        if (slotHour > currentHour + 1) { // At least 1 hour from now
          const startTime = new Date(today);
          startTime.setHours(slotHour, 0, 0, 0);
          const endTime = new Date(today);
          endTime.setHours(parseInt(timeSlot.end.split(':')[0]), 0, 0, 0);

          slots.push({
            date: 'today',
            startTime: timeSlot.start,
            endTime: timeSlot.end,
            startISO: startTime.toISOString(),
            endISO: endTime.toISOString(),
            label: `Today • ${timeSlot.label}`
          });
        }
      });

      // Tomorrow's slots (all available)
      timeSlots.forEach((timeSlot) => {
        const slotHour = parseInt(timeSlot.start.split(':')[0]);
        const startTime = new Date(tomorrow);
        startTime.setHours(slotHour, 0, 0, 0);
        const endTime = new Date(tomorrow);
        endTime.setHours(parseInt(timeSlot.end.split(':')[0]), 0, 0, 0);

        slots.push({
          date: 'tomorrow',
          startTime: timeSlot.start,
          endTime: timeSlot.end,
          startISO: startTime.toISOString(),
          endISO: endTime.toISOString(),
          label: `Tomorrow • ${timeSlot.label}`
        });
      });

      setAvailableSlots(slots);
    };

    generateSlots();
  }, []);

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const todaySlots = availableSlots.filter(slot => slot.date === 'today');
  const tomorrowSlots = availableSlots.filter(slot => slot.date === 'tomorrow');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Select Service Time</span>
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Choose a convenient 2-hour window for your doorstep service
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Today's Slots */}
          {todaySlots.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white font-semibold">Today</h3>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  Limited slots
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {todaySlots.map((slot, index) => (
                  <SlotCard
                    key={`today-${index}`}
                    slot={slot}
                    isSelected={selectedSlot?.startISO === slot.startISO}
                    onSelect={() => handleSlotSelect(slot)}
                    isPremium={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tomorrow's Slots */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-4 h-4 text-sky-400" />
              <h3 className="text-white font-semibold">Tomorrow</h3>
              <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30">
                Best availability
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tomorrowSlots.map((slot, index) => (
                <SlotCard
                  key={`tomorrow-${index}`}
                  slot={slot}
                  isSelected={selectedSlot?.startISO === slot.startISO}
                  onSelect={() => handleSlotSelect(slot)}
                  isPremium={false}
                />
              ))}
            </div>
          </div>

          {/* Selected Slot Summary */}
          <AnimatePresence>
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-white font-semibold">
                      Service Scheduled
                    </div>
                    <div className="text-emerald-400 text-sm">
                      {selectedSlot.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface SlotCardProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: () => void;
  isPremium?: boolean;
}

function SlotCard({ slot, isSelected, onSelect, isPremium = false }: SlotCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Button
        onClick={onSelect}
        variant="outline"
        className={`w-full h-auto p-4 border-2 transition-all duration-300 ${
          isSelected
            ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/25'
            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-emerald-500/50 hover:text-white'
        }`}
        data-testid={`slot-${slot.date}-${slot.startTime}`}
      >
        <div className="text-center w-full">
          <div className="font-semibold text-base mb-1">
            {slot.startTime} - {slot.endTime}
          </div>
          <div className="text-xs opacity-75">
            {slot.date === 'today' ? 'Today' : 'Tomorrow'}
          </div>
          {isPremium && (
            <div className="text-xs text-emerald-400 mt-1">
              Express
            </div>
          )}
        </div>
        
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}