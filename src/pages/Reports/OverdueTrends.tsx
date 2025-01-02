import React from 'react';
import { useStore } from '../../store/useStore';
import { getOverdueTrends } from './utils';

export function OverdueTrends() {
  const { communications, companies } = useStore();
  const trends = getOverdueTrends(communications, companies);

  // If no trends data available, show a message
  if (!trends.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Overdue Communication Trends</h2>
        <p className="text-gray-500">No overdue trends data available for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Overdue Communication Trends</h2>
      <div className="space-y-4">
        {trends.map(({ company, overdueCount }) => (
          <div key={company.id}>
            <div className="flex justify-between text-sm mb-1">
              <span>{company.name}</span>
              <span className="text-gray-500">{overdueCount} overdue</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${Math.min((overdueCount / 10) * 100, 100)}%` }} // Adjusted scaling logic
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
