import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { TIME_SLOTS } from '@/data/bookingServices';
import { useBookingStore, TimeSlot } from '@/store/booking';

export function SlotPicker() {
  const { selectedSlot, setSelectedSlot } = useBookingStore();
  const shouldReduceMotion = useReducedMotion();

  const todaySlots = TIME_SLOTS.filter(slot => slot.date === 'today');
  const tomorrowSlots = TIME_SLOTS.filter(slot => slot.date === 'tomorrow');

  const handleSlotSelect = (slot: typeof TIME_SLOTS[number]) => {
    const timeSlot: TimeSlot = {
      date: slot.date,
      time: slot.time,
      label: slot.label
    };
    setSelectedSlot(timeSlot);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Select Time Slot</span>
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Choose a convenient time for our mechanic to visit you
        </p>
      </div>

      {/* Today Slots */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <h4 className="text-gray-300 font-medium">Today</h4>
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs">
            Same Day
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {todaySlots.map((slot) => {
            const isSelected = selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
            
            return (
              <motion.div
                key={`${slot.date}-${slot.time}`}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/20' 
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <CardContent className="p-4 text-center">
                    <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {slot.time.replace('-', ' - ')}
                    </p>
                    <p className={`text-xs ${isSelected ? 'text-emerald-300' : 'text-gray-500'}`}>
                      {slot.time === '10-12' && 'Morning'}
                      {slot.time === '12-2' && 'Afternoon'}
                      {slot.time === '2-4' && 'Afternoon'}
                      {slot.time === '4-6' && 'Evening'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tomorrow Slots */}
      <div>
        <h4 className="text-gray-300 font-medium mb-4">Tomorrow</h4>
        <div className="grid grid-cols-2 gap-3">
          {tomorrowSlots.map((slot) => {
            const isSelected = selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
            
            return (
              <motion.div
                key={`${slot.date}-${slot.time}`}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/20' 
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <CardContent className="p-4 text-center">
                    <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {slot.time.replace('-', ' - ')}
                    </p>
                    <p className={`text-xs ${isSelected ? 'text-emerald-300' : 'text-gray-500'}`}>
                      {slot.time === '10-12' && 'Morning'}
                      {slot.time === '12-2' && 'Afternoon'}
                      {slot.time === '2-4' && 'Afternoon'}
                      {slot.time === '4-6' && 'Evening'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedSlot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
        >
          <p className="text-emerald-300 text-sm font-medium">
            Selected: {selectedSlot.label}
          </p>
        </motion.div>
      )}
    </div>
  );
}