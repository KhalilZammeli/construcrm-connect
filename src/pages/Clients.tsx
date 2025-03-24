
import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import { PlusCircle, Search, Filter, FileDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample client data
const clients = [
  {
    id: 1,
    name: "Construcciones Modernas S.L.",
    contact: "Carlos Martínez",
    email: "carlos@construccionesmodernas.es",
    phone: "+34 612 345 678",
    location: "Barcelona",
    status: "Active",
    projects: 5
  },
  {
    id: 2,
    name: "Reformas Integrales Martínez",
    contact: "Ana Martínez",
    email: "ana@reformasmartinez.com",
    phone: "+34 623 456 789",
    location: "Madrid",
    status: "Active",
    projects: 3
  },
  {
    id: 3,
    name: "Grupo Constructor Ibérico",
    contact: "Javier Santos",
    email: "jsantos@grupoiberico.es",
    phone: "+34 634 567 890",
    location: "Valencia",
    status: "Active",
    projects: 2
  },
  {
    id: 4,
    name: "InnovaHogar Barcelona",
    contact: "Marta Puig",
    email: "mpuig@innovahogar.cat",
    phone: "+34 645 678 901",
    location: "Barcelona",
    status: "Pending",
    projects: 1
  },
  {
    id: 5,
    name: "Constructora López y Asociados",
    contact: "Roberto López",
    email: "rlopez@clopez.es",
    phone: "+34 656 789 012",
    location: "Sevilla",
    status: "Completed",
    projects: 4
  },
  {
    id: 6,
    name: "Edificaciones Modernas S.A.",
    contact: "Elena Gomez",
    email: "egomez@edificacionesmodernas.com",
    phone: "+34 667 890 123",
    location: "Málaga",
    status: "Active",
    projects: 2
  },
  {
    id: 7,
    name: "Construcciones Durán",
    contact: "Miguel Durán",
    email: "mduran@construccionesduran.es",
    phone: "+34 678 901 234",
    location: "Bilbao",
    status: "Pending",
    projects: 1
  },
  {
    id: 8,
    name: "Architech Solutions",
    contact: "Paula Vega",
    email: "pvega@architech.com",
    phone: "+34 689 012 345",
    location: "Madrid",
    status: "Active",
    projects: 3
  }
];

const Clients = () => {
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
        <Button size="sm" className="gap-1">
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
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 w-full border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary/40">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y">
              {clients.map((client) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-secondary/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{client.contact}</div>
                    <div className="text-xs text-muted-foreground">{client.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {client.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                      client.status === "Active" ? "bg-green-100 text-green-800" :
                      client.status === "Pending" ? "bg-amber-100 text-amber-800" :
                      "bg-blue-100 text-blue-800"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {client.projects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">8</span> of <span className="font-medium">124</span> clients
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
    </Layout>
  );
};

export default Clients;
