
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import ClientForm, { ClientFormValues } from './ClientForm';
import { Client } from './ClientList';

interface EditClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, values: ClientFormValues) => void;
  client: Client | null;
  isLoading?: boolean;
}

const EditClientDialog: React.FC<EditClientDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  client,
  isLoading = false
}) => {
  if (!client) return null;

  const handleSubmit = async (values: ClientFormValues) => {
    await onSubmit(client.id, values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update the client details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ClientForm 
            defaultValues={{
              name: client.name,
              contact: client.contact,
              email: client.email,
              phone: client.phone,
              location: client.location,
              status: client.status
            }}
            onSubmit={handleSubmit} 
            isLoading={isLoading}
            submitLabel="Update Client"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientDialog;
