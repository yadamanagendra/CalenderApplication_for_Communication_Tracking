import React, { useState } from 'react';
import { CalendarGrid } from './CalendarGrid';
import { CommunicationList } from './CommunicationList';
import { NotificationPanel } from './NotificationPanel';
import { CommunicationModal } from './CommunicationModal';
import { useStore } from '../../store/useStore';

export function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  const { companies } = useStore();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Communication Calendar</h1>
        <div className="flex items-center space-x-4">
          <NotificationPanel />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-105"
          >
            Log Communication
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <CalendarGrid />
        </div>
        <div className="lg:mt-0 mt-6">
          <CommunicationList />
        </div>
      </div>

      {/* Communication Modal */}
      <CommunicationModal
        companyIds={selectedCompanyIds.length > 0 ? selectedCompanyIds : companies.map(c => c.id)}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCompanyIds([]); // Reset company selection on close
        }}
      />
    </div>
  );
}
