
import { Document } from '@/components/documents/DocumentForm';

export const initialDocuments: Document[] = [
  {
    id: 1,
    title: 'Building Permit Application',
    description: 'Official building permit application for the Valencia project',
    category: 'Permits',
    client: 'Costa del Sol Development',
    status: 'Approved',
    createdAt: '2023-07-10T08:30:00Z',
    updatedAt: '2023-07-15T14:45:00Z',
    fileSize: '1.2 MB',
    fileType: 'pdf'
  },
  {
    id: 2,
    title: 'Technical Audit Report',
    description: 'Energy efficiency audit for Barcelona renovation',
    category: 'Audits',
    client: 'Barcelona Properties Ltd',
    status: 'In Review',
    createdAt: '2023-08-05T10:15:00Z',
    updatedAt: '2023-08-05T10:15:00Z',
    fileSize: '3.5 MB',
    fileType: 'pdf'
  },
  {
    id: 3,
    title: 'Service Contract',
    description: 'Legal service contract for Madrid office construction',
    category: 'Contracts',
    client: 'Madrid Business Center',
    status: 'Draft',
    createdAt: '2023-08-20T09:00:00Z',
    updatedAt: '2023-08-22T16:30:00Z',
    fileSize: '850 KB',
    fileType: 'docx'
  },
  {
    id: 4,
    title: 'Project Quote',
    description: 'Detailed quote for residential complex renovation',
    category: 'Quotes',
    client: 'Alicante Residentials',
    status: 'Pending',
    createdAt: '2023-09-01T11:45:00Z',
    updatedAt: '2023-09-01T11:45:00Z',
    fileSize: '1.8 MB',
    fileType: 'xlsx'
  },
  {
    id: 5,
    title: 'Architectural Plans',
    description: 'Complete architectural plans for the Seville project',
    category: 'Plans',
    client: 'Andalucia Construction Group',
    status: 'Approved',
    createdAt: '2023-09-15T13:20:00Z',
    updatedAt: '2023-09-20T09:10:00Z',
    fileSize: '5.2 MB',
    fileType: 'dwg'
  }
];
