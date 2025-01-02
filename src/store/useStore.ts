import { create } from 'zustand';
import { CommunicationMethod, Company, Communication } from '../types';

interface AppState {
  companies: Company[];
  communicationMethods: CommunicationMethod[];
  communications: Communication[];
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addCommunication: (communication: Communication) => void;
  updateCommunication: (communication: Communication) => void;
}

const defaultCommunicationMethods: CommunicationMethod[] = [
  {
    id: '1',
    name: 'LinkedIn Post',
    description: 'Post on company LinkedIn page',
    sequence: 1,
    isMandatory: true,
  },
  {
    id: '2',
    name: 'LinkedIn Message',
    description: 'Direct message on LinkedIn',
    sequence: 2,
    isMandatory: true,
  },
  {
    id: '3',
    name: 'Email',
    description: 'Email communication',
    sequence: 3,
    isMandatory: true,
  },
  {
    id: '4',
    name: 'Phone Call',
    description: 'Phone call communication',
    sequence: 4,
    isMandatory: true,
  },
  {
    id: '5',
    name: 'Other',
    description: 'Other forms of communication',
    sequence: 5,
    isMandatory: false,
  },
];

export const useStore = create<AppState>((set) => ({
  companies: [],
  communicationMethods: defaultCommunicationMethods,
  communications: [],
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  updateCompany: (company) =>
    set((state) => ({
      companies: state.companies.map((c) => (c.id === company.id ? company : c)),
    })),
  deleteCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((c) => c.id !== id),
    })),
  addCommunication: (communication) =>
    set((state) => ({
      communications: [...state.communications, communication],
    })),
  updateCommunication: (communication) =>
    set((state) => ({
      communications: state.communications.map((c) =>
        c.id === communication.id ? communication : c
      ),
    })),
}));