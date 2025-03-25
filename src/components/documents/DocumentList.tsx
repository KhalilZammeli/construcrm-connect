
import React from 'react';
import { Document } from './DocumentForm';
import { Edit, Trash, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface DocumentListProps {
  documents: Document[];
  onEdit: (document: Document) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Draft':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'In Review':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const DocumentList: React.FC<DocumentListProps> = ({ documents, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Document</TableHead>
            <TableHead className="w-[15%]">Category</TableHead>
            <TableHead className="w-[15%]">Client</TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead className="w-[15%]">Last Updated</TableHead>
            <TableHead className="w-[15%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No documents found. Add your first document!
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground hover:underline cursor-pointer" onClick={() => onView(doc.id)}>
                        {doc.title}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {doc.description}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {doc.fileType.toUpperCase()} · {doc.fileSize}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {doc.category}
                </TableCell>
                <TableCell>
                  {doc.client}
                </TableCell>
                <TableCell>
                  <Badge className={`font-normal ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(doc.updatedAt), 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(doc.id)}
                      title="View"
                    >
                      <Download size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(doc)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(doc.id)}
                      title="Delete"
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
