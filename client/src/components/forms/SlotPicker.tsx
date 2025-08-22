import { useState } from 'react';
import { format, addHours, addDays, startOfHour, isAfter } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface SlotPickerProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  onSlotSelect?: (start: Date, end: Date) => void;
  selectedSlot?: { start: Date; end: Date } | null;
}

export function SlotPicker({ 
  id, 
  label, 
  error, 
  required, 
  onSlotSelect,
  selectedSlot 
}: SlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 3 days
  const dates = Array.from({ length: 3 }, (_, i) => addDays(new Date(), i));
  
  // Generate time slots (9 AM to 6 PM, 2-hour slots)
  const timeSlots = [
    { value: '09:00', label: '9:00 AM - 11:00 AM' },
    { value: '11:00', label: '11:00 AM - 1:00 PM' },
    { value: '13:00', label: '1:00 PM - 3:00 PM' },
    { value: '15:00', label: '3:00 PM - 5:00 PM' },
    { value: '17:00', label: '5:00 PM - 7:00 PM' },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeValue: string) => {
    if (!selectedDate) return;

    const [hours, minutes] = timeValue.split(':').map(Number);
    const startTime = new Date(selectedDate);
    startTime.setHours(hours, minutes, 0, 0);
    const endTime = addHours(startTime, 2);

    // Check if slot is in the past
    const now = new Date();
    if (isAfter(now, startTime)) {
      return;
    }

    setSelectedTime(timeValue);
    onSlotSelect?.(startTime, endTime);
  };

  const isTimeSlotDisabled = (timeValue: string): boolean => {
    if (!selectedDate) return true;
    
    const [hours, minutes] = timeValue.split(':').map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hours, minutes, 0, 0);
    
    return isAfter(new Date(), slotTime);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Date Selection */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Select Date
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {dates.map((date, index) => (
            <Button
              key={index}
              type="button"
              variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
              onClick={() => handleDateSelect(date)}
              className="p-3 text-center"
              data-testid={`button-date-${index}`}
            >
              <div>
                <div className="font-medium">
                  {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : format(date, 'MMM dd')}
                </div>
                <div className="text-xs opacity-80">
                  {format(date, 'EEE')}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Select Time Slot
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const isDisabled = isTimeSlotDisabled(slot.value);
              return (
                <Button
                  key={slot.value}
                  type="button"
                  variant={selectedTime === slot.value ? "default" : "outline"}
                  onClick={() => handleTimeSelect(slot.value)}
                  disabled={isDisabled}
                  className={`p-3 text-left ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  data-testid={`button-time-${slot.value}`}
                >
                  {slot.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Slot Display */}
      {selectedSlot && (
        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-primary-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span data-testid="selected-slot-display">
                {format(selectedSlot.start, 'EEEE, MMMM dd')} at {format(selectedSlot.start, 'h:mm a')} - {format(selectedSlot.end, 'h:mm a')}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <p className="text-red-500 text-sm" data-testid={`error-${id}`}>
          {error}
        </p>
      )}
    </div>
  );
}
