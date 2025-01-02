// src/components/CompanySelect.tsx
import React from 'react';
import { Company } from '../../../types';  // This works since index.ts is in the types folder

interface CompanySelectProps {
  companies: Company[];
  value: string | null;
  onChange: (companyId: string | null) => void;
}

export function CompanySelect({ companies, value, onChange }: CompanySelectProps) {
  return (
    <div>
      <label htmlFor="company-select" className="block text-sm font-medium text-gray-700">
        Filter by Company
      </label>
      <select
        id="company-select"
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        aria-label="Select a company"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">All Companies</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
}
