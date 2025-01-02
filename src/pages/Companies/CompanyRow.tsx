import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Company } from '../../types';
import { useStore } from '../../store/useStore';
import { CompanyModal } from './CompanyModal';

interface CompanyRowProps {
  company: Company;
}

export function CompanyRow({ company }: CompanyRowProps) {
  const { deleteCompany } = useStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{company.name}</div>
        <div className="text-sm text-gray-500">
          <a href={company.linkedinProfile} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            LinkedIn Profile
          </a>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{company.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">Every {company.communicationPeriodicity} days</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => deleteCompany(company.id)}
          className="text-red-600 hover:text-red-900 inline-flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </button>
      </td>
      {isEditModalOpen && (
        <CompanyModal
          company={company}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </tr>
  );
}