import React from 'react';
import { useStore } from '../../store/useStore';
import { getEngagementMetrics } from './utils';

export function EngagementEffectiveness() {
  const { communications, communicationMethods } = useStore();
  const metrics = getEngagementMetrics(communications, communicationMethods);

  // If no metrics available, display a message
  if (!metrics.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Engagement Effectiveness</h2>
        <p className="text-gray-500">No engagement data available for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Engagement Effectiveness</h2>
      <div className="space-y-4">
        {metrics.map(({ method, successRate }) => (
          <div key={method.id}>
            <div className="flex justify-between text-sm mb-1">
              <span>{method.name}</span>
              <span className="text-gray-500">{successRate.toFixed(1)}% success rate</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${successRate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
