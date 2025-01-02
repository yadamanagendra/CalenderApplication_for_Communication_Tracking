import React from 'react';
import { useStore } from '../../store/useStore';
import { CompanyRow } from './CompanyRow';

export function CompanyList() {
  const { companies } = useStore();

  if (companies.length === 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <p className="text-gray-500">No companies found. Please add a company.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodicity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <CompanyRow key={company.id} company={company} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
