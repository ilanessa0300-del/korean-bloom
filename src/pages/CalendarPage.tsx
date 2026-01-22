import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { KoreanCard } from '@/components/KoreanCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CalendarPage() {
  const { t } = useLanguage();
  const { getCalendarEntry } = useAppDataContext();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDateString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const today = new Date().toISOString().split('T')[0];

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(day);
      const entry = getCalendarEntry(dateString);
      const isToday = dateString === today;
      const hasActivity = !!entry && entry.lessonsCount > 0;

      days.push(
        <motion.button
          key={day}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedDate(dateString)}
          className={`aspect-square rounded-lg border-2 flex items-center justify-center font-medium text-sm relative transition-colors
            ${isToday ? 'border-primary bg-primary/10' : 'border-transparent'}
            ${hasActivity ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}
          `}
        >
          {day}
          {hasActivity && !isToday && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-foreground" />
          )}
        </motion.button>
      );
    }

    return days;
  };

  const selectedEntry = selectedDate ? getCalendarEntry(selectedDate) : null;

  return (
    <AppLayout title={t.calendar.title}>
      <div className="space-y-6">
        {/* Month navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <h2 className="text-xl font-bold">
            {t.calendar.months[month]} {year}
          </h2>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Calendar grid */}
        <KoreanCard>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {t.calendar.weekdays.map((day) => (
              <div 
                key={day} 
                className="aspect-square flex items-center justify-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </KoreanCard>

        {/* Selected date modal */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedDate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <KoreanCard className="w-full max-w-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">
                      {new Date(selectedDate).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h3>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {selectedEntry && selectedEntry.lessonsCount > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Уроков:</span>
                        <span className="font-bold">{selectedEntry.lessonsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Минут:</span>
                        <span className="font-bold">{selectedEntry.minutes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Баллов:</span>
                        <span className="font-bold text-primary">{selectedEntry.points}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      {t.calendar.noLessons}
                    </p>
                  )}
                </KoreanCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
