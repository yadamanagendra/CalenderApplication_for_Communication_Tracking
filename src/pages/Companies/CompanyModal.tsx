import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Company } from '../../types';
import { useStore } from '../../store/useStore';

interface CompanyModalProps {
  company?: Company;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyModal({ company, isOpen, onClose }: CompanyModalProps) {
  const { addCompany, updateCompany } = useStore();
  const [formData, setFormData] = useState<Partial<Company>>(
    company || {
      name: '',
      location: '',
      linkedinProfile: '',
      emails: [''],
      phoneNumbers: [''],
      comments: '',
      communicationPeriodicity: 14,
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for submit button disabling

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable submit button

    try {
      if (company) {
        await updateCompany({ ...company, ...formData as Company });
      } else {
        await addCompany({
          ...formData as Company,
          id: crypto.randomUUID(),
        });
      }
      onClose();
    } catch (error) {
      console.error("Error submitting company data:", error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const handleArrayInput = (
    field: 'emails' | 'phoneNumbers',
    index: number,
    value: string
  ) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'emails' | 'phoneNumbers') => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] || []), ''],
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="company-modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="company-modal-title" className="text-xl font-semibold">
            {company ? 'Edit Company' : 'Add Company'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              required
              value={formData.linkedinProfile}
              onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Emails */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emails
            </label>
            {formData.emails?.map((email, index) => (
              <input
                key={index}
                type="email"
                required
                value={email}
                onChange={(e) => handleArrayInput('emails', index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('emails')}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Add another email
            </button>
          </div>

          {/* Phone Numbers */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Numbers
            </label>
            {formData.phoneNumbers?.map((phone, index) => (
              <input
                key={index}
                type="tel"
                required
                value={phone}
                onChange={(e) => handleArrayInput('phoneNumbers', index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('phoneNumbers')}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Add another phone number
            </button>
          </div>

          {/* Communication Periodicity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Periodicity (days)
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.communicationPeriodicity}
              onChange={(e) => setFormData({ ...formData, communicationPeriodicity: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : company ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
