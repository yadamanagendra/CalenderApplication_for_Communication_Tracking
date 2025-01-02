import React from 'react';
import { format, isSameDay } from 'date-fns';
import { useStore } from '../../store/useStore';
import { getCommunicationStatus } from './utils';
import { CheckCircle, XCircle, Clock } from 'lucide-react'; // Example icons

interface CalendarDayProps {
  date: Date;
}

export function CalendarDay({ date }: CalendarDayProps) {
  const { communications } = useStore();
  const todaysCommunications = communications.filter(comm => 
    isSameDay(new Date(comm.date), date)
  );
  const status = getCommunicationStatus(todaysCommunications);

  const renderStatusIcon = () => {
    switch (status) {
      case 'overdue': return <XCircle className="text-red-500" />;
      case 'due': return <Clock className="text-yellow-500" />;
      case 'completed': return <CheckCircle className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md min-h-[120px] transition-transform transform hover:scale-105 ${
      status === 'overdue' ? 'bg-red-50' :
      status === 'due' ? 'bg-yellow-50' :
      status === 'completed' ? 'bg-green-50' : 'bg-gray-50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">{format(date, 'd')}</div>
        <div className="text-xs text-gray-500">{format(date, 'EEE')}</div>
      </div>

      {/* Status Icon */}
      <div className="mt-2 text-center">
        {renderStatusIcon()}
      </div>

      {todaysCommunications.length > 0 && (
        <div className="mt-3 space-y-2">
          {todaysCommunications.map(comm => (
            <div
              key={comm.id}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
              title={comm.notes}
            >
              <div className="text-sm font-medium">{comm.methodId}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
