
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import ClientForm, { ClientFormValues } from './ClientForm';
import { Button } from '@/components/ui/button';

interface AddClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ClientFormValues) => void;
  isLoading?: boolean;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const handleSubmit = async (values: ClientFormValues) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Fill in the client details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ClientForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading}
            submitLabel="Add Client"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
