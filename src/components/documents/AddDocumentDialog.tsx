
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DocumentForm, { DocumentFormValues } from './DocumentForm';

interface AddDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DocumentFormValues) => void;
  isLoading?: boolean;
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  isLoading
}) => {
  const handleSubmit = (values: DocumentFormValues) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>
        <DocumentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
