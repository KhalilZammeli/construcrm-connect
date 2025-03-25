
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DocumentForm, { Document, DocumentFormValues } from './DocumentForm';

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, values: DocumentFormValues) => void;
  document: Document | null;
  isLoading?: boolean;
}

const EditDocumentDialog: React.FC<EditDocumentDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  document,
  isLoading
}) => {
  if (!document) return null;

  const handleSubmit = (values: DocumentFormValues) => {
    onSubmit(document.id, values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
        </DialogHeader>
        <DocumentForm 
          defaultValues={{
            title: document.title,
            description: document.description,
            category: document.category,
            client: document.client,
            status: document.status,
            fileSize: document.fileSize,
            fileType: document.fileType
          }} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentDialog;
