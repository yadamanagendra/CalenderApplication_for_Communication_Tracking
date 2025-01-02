import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store/useStore';

export function ActivityLog() {
  const { communications, companies, communicationMethods } = useStore();
  const sortedActivities = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Activity Log</h2>
      </div>
      <div className="divide-y">
        {sortedActivities.map(activity => {
          const company = companies.find(c => c.id === activity.companyId);
          const method = communicationMethods.find(m => m.id === activity.methodId);
          
          return (
            <div key={activity.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{company?.name}</span>
                  <span className="mx-2">·</span>
                  <span className="text-gray-500">{method?.name}</span>
                </div>
                <time className="text-sm text-gray-500">
                  {format(new Date(activity.date), 'MMM d, yyyy')}
                </time>
              </div>
              {activity.notes && (
                <p className="mt-1 text-sm text-gray-600">{activity.notes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}