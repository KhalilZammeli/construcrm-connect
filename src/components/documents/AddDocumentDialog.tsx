
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DocumentForm, { DocumentFormValues } from './DocumentForm';

interface AddDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DocumentFormValues, file?: File) => void;
  isLoading?: boolean;
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  isLoading
}) => {
  const handleSubmit = (values: DocumentFormValues, file?: File) => {
    onSubmit(values, file);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
          <DialogDescription>
            Upload and fill in the details for your new document.
          </DialogDescription>
        </DialogHeader>
        <DocumentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
