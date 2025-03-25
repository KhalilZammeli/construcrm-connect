
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DocumentForm, { Document, DocumentFormValues } from './DocumentForm';

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, values: DocumentFormValues, file?: File) => void;
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

  const handleSubmit = (values: DocumentFormValues, file?: File) => {
    onSubmit(document.id, values, file);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>
            Make changes to your document information or upload a new file.
          </DialogDescription>
        </DialogHeader>
        <DocumentForm 
          defaultValues={{
            title: document.title,
            description: document.description,
            category: document.category,
            client: document.client,
            status: document.status,
            fileSize: document.fileSize,
            fileType: document.fileType,
            fileName: document.fileName
          }} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentDialog;
