
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Briefcase 
} from 'lucide-react';
import { Client } from '@/components/clients/ClientList';
import { toast } from 'sonner';
import { initialClients } from '../data/mockData';
import EditClientDialog from '@/components/clients/EditClientDialog';
import DeleteClientDialog from '@/components/clients/DeleteClientDialog';
import { ClientFormValues } from '@/components/clients/ClientForm';

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchClient = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!id) {
          throw new Error("Client ID is required");
        }
        
        // Find client in mock data
        const foundClient = initialClients.find(c => c.id === parseInt(id));
        
        if (!foundClient) {
          throw new Error("Client not found");
        }
        
        setClient(foundClient);
      } catch (error) {
        console.error("Error fetching client:", error);
        toast.error("Failed to load client details");
        // Navigate back to clients list if client not found
        navigate('/clients');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClient();
  }, [id, navigate]);

  const handleEditClient = async (clientId: number, values: ClientFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!client) return;
      
      const updatedClient = { ...client, ...values };
      setClient(updatedClient);
      toast.success("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Failed to update client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Client deleted successfully!");
      // Navigate back to clients list after deletion
      navigate('/clients');
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-muted-foreground">Loading client details...</div>
        </div>
      </Layout>
    );
  }

  if (!client) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-muted-foreground">Client not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={client.name}
        description={`Client information and project details`}
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => navigate('/clients')}
        >
          <ArrowLeft size={16} />
          <span>Back to Clients</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit size={16} />
          <span>Edit</span>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="gap-1"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Information Card */}
        <div className="md:col-span-1 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h3 className="font-medium">Client Information</h3>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{client.email}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{client.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{client.location}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    client.status === "Active" ? "bg-green-100 text-green-800" :
                    client.status === "Pending" ? "bg-amber-100 text-amber-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {client.status}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Briefcase size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact Person</p>
                <p className="text-sm font-medium">{client.contact}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Card */}
        <div className="md:col-span-2 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Projects</h3>
            <Button size="sm" className="gap-1">
              <span>Add Project</span>
            </Button>
          </div>
          
          <div className="p-5">
            {client.projects > 0 ? (
              <div className="text-sm">
                {/* Placeholder for project list */}
                <p>This client has {client.projects} active projects.</p>
                <p className="text-muted-foreground mt-2">Project list coming soon...</p>
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-4">
                  This client doesn't have any projects yet. Create your first project to get started.
                </p>
                <Button>Create Project</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <EditClientDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditClient}
        client={client}
        isLoading={isLoading}
      />
      
      <DeleteClientDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteClient}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default ClientDetails;
