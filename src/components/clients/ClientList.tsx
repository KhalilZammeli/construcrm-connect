
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Edit, Trash2, MoreHorizontal, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Pending" | "Completed";
  projects: number;
}

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clients,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No clients found. Add your first client to get started.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow 
                key={client.id}
                className="hover:bg-secondary/30 transition-colors duration-200"
              >
                <TableCell>
                  <div className="text-sm font-medium">{client.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{client.contact}</div>
                  <div className="text-xs text-muted-foreground">{client.email}</div>
                </TableCell>
                <TableCell className="text-sm">
                  {client.location}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                    client.status === "Active" ? "bg-green-100 text-green-800" :
                    client.status === "Pending" ? "bg-amber-100 text-amber-800" :
                    "bg-blue-100 text-blue-800"
                  )}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  {client.projects}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onView(client.id)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(client)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(client.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Client
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientList;
