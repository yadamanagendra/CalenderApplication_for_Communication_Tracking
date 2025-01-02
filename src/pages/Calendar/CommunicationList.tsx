import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store/useStore';
import { getCommunicationStatus } from './utils';
import { CheckCircle, XCircle, Clock } from 'lucide-react'; // Add icons for status

export function CommunicationList() {
  const { communications, companies } = useStore();
  const sortedCommunications = [...communications].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <XCircle className="text-red-500" />;
      case 'due':
        return <Clock className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-teal-500 to-blue-500">
        <h2 className="text-xl font-bold text-white">Upcoming Communications</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedCommunications.map(comm => {
          const company = companies.find(c => c.id === comm.companyId);
          const status = getCommunicationStatus([comm]);

          return (
            <div
              key={comm.id}
              className={`p-4 flex items-center justify-between ${
                status === 'overdue' ? 'bg-red-50' :
                status === 'due' ? 'bg-yellow-50' : 'bg-white'
              } hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex flex-col space-y-1">
                <div className="font-semibold text-lg">{company?.name}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(comm.date), 'MMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-700">{comm.notes}</div>
              </div>
              {/* Status Icon */}
              <div className="text-lg">
                {renderStatusIcon(status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
