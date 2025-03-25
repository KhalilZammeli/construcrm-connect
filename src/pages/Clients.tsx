
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import { PlusCircle, Search, Filter, FileDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ClientList, { Client } from '@/components/clients/ClientList';
import AddClientDialog from '@/components/clients/AddClientDialog';
import EditClientDialog from '@/components/clients/EditClientDialog';
import DeleteClientDialog from '@/components/clients/DeleteClientDialog';
import { ClientFormValues } from '@/components/clients/ClientForm';
import { useNavigate } from 'react-router-dom';
import { initialClients } from '../data/mockData';

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = async (values: ClientFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new client with a generated ID
      // Fix: Use type assertion to ensure all required fields are provided
      const newClient: Client = {
        id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
        name: values.name,
        contact: values.contact,
        email: values.email,
        phone: values.phone,
        location: values.location,
        status: values.status,
        projects: 0
      };
      
      setClients(prev => [...prev, newClient]);
      toast.success("Client added successfully!");
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClient = async (id: number, values: ClientFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setClients(prev => 
        prev.map(client => 
          client.id === id 
            ? { ...client, ...values } 
            : client
        )
      );
      toast.success("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Failed to update client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!selectedClient) return;
    
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setClients(prev => prev.filter(client => client.id !== selectedClient.id));
      toast.success("Client deleted successfully!");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewClient = (id: number) => {
    navigate(`/clients/${id}`);
  };

  return (
    <Layout>
      <PageHeader 
        title="Clients" 
        description="Manage your construction clients, view details, and track projects."
      >
        <Button variant="outline" size="sm" className="gap-1">
          <FileDown size={16} />
          <span>Export</span>
        </Button>
        <Button 
          size="sm" 
          className="gap-1"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle size={16} />
          <span>Add Client</span>
        </Button>
      </PageHeader>
      
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        <ClientList 
          clients={filteredClients}
          onEdit={(client) => {
            setSelectedClient(client);
            setIsEditDialogOpen(true);
          }}
          onDelete={(id) => {
            const client = clients.find(c => c.id === id);
            if (client) {
              setSelectedClient(client);
              setIsDeleteDialogOpen(true);
            }
          }}
          onView={handleViewClient}
        />
        
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredClients.length}</span> of <span className="font-medium">{clients.length}</span> clients
          </div>
          
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              &lt;
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              &gt;
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dialogs for CRUD operations */}
      <AddClientDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddClient}
        isLoading={isLoading}
      />
      
      <EditClientDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditClient}
        client={selectedClient}
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

export default Clients;
