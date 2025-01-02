import React, { useState } from 'react';

interface DateRangePickerProps {
  onChange: (range: { start: Date | null; end: Date | null }) => void;
}

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    onChange({
      start: newStartDate ? new Date(newStartDate) : null,
      end: endDate ? new Date(endDate) : null,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    onChange({
      start: startDate ? new Date(startDate) : null,
      end: newEndDate ? new Date(newEndDate) : null,
    });
  };

  return (
    <div className="flex space-x-4">
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate || ''}
          onChange={handleStartDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          value={endDate || ''}
          onChange={handleEndDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min={startDate || undefined} // End date cannot be before the start date
        />
      </div>
    </div>
  );
}
