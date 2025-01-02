import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Communication } from '../../types';

interface CommunicationModalProps {
  companyIds: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function CommunicationModal({ companyIds, isOpen, onClose }: CommunicationModalProps) {
  const { communicationMethods, addCommunication } = useStore();
  const [formData, setFormData] = useState({
    methodId: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    companyIds.forEach(companyId => {
      const communication: Communication = {
        id: crypto.randomUUID(),
        companyId,
        methodId: formData.methodId,
        date: new Date(formData.date).toISOString(),
        notes: formData.notes,
        completed: true,
      };
      
      addCommunication(communication);
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-500 to-blue-500">
          <h2 className="text-xl font-semibold text-white">Log Communication</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Method
            </label>
            <select
              required
              value={formData.methodId}
              onChange={(e) => setFormData({ ...formData, methodId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a method</option>
              {communicationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
