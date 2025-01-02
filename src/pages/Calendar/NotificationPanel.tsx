import React, { useState } from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store/useStore';
import { Bell } from 'lucide-react';
import { getCommunicationStatus } from './utils';

export function NotificationPanel() {
  const { communications, companies } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const now = new Date();

  const overdueComms = communications.filter(comm => 
    getCommunicationStatus([comm]) === 'overdue'
  );

  const todayComms = communications.filter(comm =>
    getCommunicationStatus([comm]) === 'due'
  );

  const totalNotifications = overdueComms.length + todayComms.length;

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell className="h-6 w-6" />
        {totalNotifications > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {totalNotifications}
          </span>
        )}
      </button>

      {isOpen && totalNotifications > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border divide-y z-10">
          {overdueComms.length > 0 && (
            <div className="p-4">
              <h3 className="font-medium text-red-600 mb-2">Overdue Communications</h3>
              <div className="space-y-2">
                {overdueComms.map(comm => {
                  const company = companies.find(c => c.id === comm.companyId);
                  return (
                    <div key={comm.id} className="text-sm">
                      <div className="font-medium">{company?.name}</div>
                      <div className="text-gray-500">
                        Due: {format(new Date(comm.date), 'MMM d, yyyy')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {todayComms.length > 0 && (
            <div className="p-4">
              <h3 className="font-medium text-yellow-600 mb-2">Due Today</h3>
              <div className="space-y-2">
                {todayComms.map(comm => {
                  const company = companies.find(c => c.id === comm.companyId);
                  return (
                    <div key={comm.id} className="text-sm">
                      <div className="font-medium">{company?.name}</div>
                      <div className="text-gray-500">
                        {format(new Date(comm.date), 'MMM d, yyyy')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
