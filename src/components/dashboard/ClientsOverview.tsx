
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { cn } from '@/lib/utils';

const clients = [
  { 
    name: "Construcciones Modernas S.L.", 
    status: "Active", 
    projects: 5, 
    value: "€184,500" 
  },
  { 
    name: "Reformas Integrales Martínez",
    status: "Active", 
    projects: 3, 
    value: "€112,000" 
  },
  { 
    name: "Grupo Constructor Ibérico",
    status: "Active", 
    projects: 2, 
    value: "€87,300" 
  },
  { 
    name: "InnovaHogar Barcelona",
    status: "Pending", 
    projects: 1, 
    value: "€56,000" 
  },
  { 
    name: "Constructora López y Asociados",
    status: "Completed", 
    projects: 4, 
    value: "€143,200" 
  }
];

const ClientsOverview: React.FC = () => {
  return (
    <DashboardCard 
      title="Recent Clients" 
      noPadding
      footer={
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Showing 5 of 124 clients</span>
          <a href="/clients" className="flex items-center text-sm font-medium text-primary hover:underline transition-all duration-200">
            View all
            <ArrowUpRight size={14} className="ml-1" />
          </a>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary/40">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Projects
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.map((client, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-secondary/30 transition-colors duration-200"
              >
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{client.name}</div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={cn(
                    "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                    client.status === "Active" ? "bg-green-100 text-green-800" :
                    client.status === "Pending" ? "bg-amber-100 text-amber-800" :
                    "bg-blue-100 text-blue-800"
                  )}>
                    {client.status}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  {client.projects}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className="font-medium">{client.value}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default ClientsOverview;
