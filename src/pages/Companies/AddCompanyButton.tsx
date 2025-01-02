import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CompanyModal } from './CompanyModal';

export function AddCompanyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the modal closing
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isModalOpen} // Disable the button while the modal is open
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Company
      </button>
      
      {/* Modal component */}
      {isModalOpen && (
        <CompanyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
