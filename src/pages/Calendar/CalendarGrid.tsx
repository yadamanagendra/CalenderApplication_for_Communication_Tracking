import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useStore } from '../../store/useStore';
import { CalendarDay } from './CalendarDay';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'; // Add icons

export function CalendarGrid() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-4 flex items-center justify-between border-b bg-gradient-to-r from-blue-500 to-teal-400">
        <h2 className="text-xl font-bold text-white">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            <CalendarIcon size={20} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-300">
        {/* Day Labels (Sun, Mon, Tue, etc.) */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-blue-500 text-white p-3 text-center font-semibold">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day) => (
          <CalendarDay key={day.toISOString()} date={day} />
        ))}
      </div>
    </div>
  );
}
