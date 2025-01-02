import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { groupCommunicationsByMethod, filterCommunications } from './utils';
import { DateRangePicker } from './components/DateRangePicker';
import { CompanySelect } from './components/CompanySelect';

export function CommunicationFrequency() {
  const { communications, communicationMethods, companies } = useStore();

  // Correcting the initial state to match expected types: Date or null
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const filteredCommunications = filterCommunications(communications, dateRange, selectedCompany);
  const groupedData = groupCommunicationsByMethod(filteredCommunications, communicationMethods);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Communication Frequency</h2>
        <button
          onClick={() => {
            const csvContent = groupedData
              .map(({ method, count }) => `${method.name},${count}`)
              .join('\n');
            const blob = new Blob([`Method,Count\n${csvContent}`], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'communication-frequency.csv';
            a.click();
          }}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Export CSV
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <DateRangePicker onChange={setDateRange} />
        <CompanySelect
          companies={companies}
          value={selectedCompany}
          onChange={setSelectedCompany}
        />
      </div>

      <div className="space-y-4">
        {groupedData.map(({ method, count, percentage }) => (
          <div key={method.id}>
            <div className="flex justify-between text-sm mb-1">
              <span>{method.name}</span>
              <span className="text-gray-500">{count} communications</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
