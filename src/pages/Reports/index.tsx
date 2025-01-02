import React from 'react';
import { CommunicationFrequency } from './CommunicationFrequency';
import { OverdueTrends } from './OverdueTrends';
import { ActivityLog } from './ActivityLog';

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommunicationFrequency />
        <OverdueTrends />
      </div>
      <ActivityLog />
    </div>
  );
}