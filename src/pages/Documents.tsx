
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import { PlusCircle, Search, Filter, FileDown, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DocumentList from '@/components/documents/DocumentList';
import AddDocumentDialog from '@/components/documents/AddDocumentDialog';
import EditDocumentDialog from '@/components/documents/EditDocumentDialog';
import DeleteDocumentDialog from '@/components/documents/DeleteDocumentDialog';
import { Document, DocumentFormValues } from '@/components/documents/DocumentForm';
import { initialDocuments } from '../data/mockDocuments';

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDocument = async (values: DocumentFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new document with a generated ID
      const newDocument: Document = {
        id: documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1,
        title: values.title,
        description: values.description,
        category: values.category,
        client: values.client,
        status: values.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fileSize: values.fileSize || '0 KB',
        fileType: values.fileType || 'pdf'
      };
      
      setDocuments(prev => [...prev, newDocument]);
      toast.success("Document added successfully!");
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Failed to add document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDocument = async (id: number, values: DocumentFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === id 
            ? { 
                ...doc, 
                title: values.title,
                description: values.description,
                category: values.category,
                client: values.client,
                status: values.status,
                fileSize: values.fileSize || doc.fileSize,
                fileType: values.fileType || doc.fileType,
                updatedAt: new Date().toISOString()
              } 
            : doc
        )
      );
      toast.success("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async () => {
    if (!selectedDocument) return;
    
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDocuments(prev => prev.filter(doc => doc.id !== selectedDocument.id));
      toast.success("Document deleted successfully!");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDocument = (id: number) => {
    navigate(`/documents/${id}`);
  };

  return (
    <Layout>
      <PageHeader 
        title="Documents" 
        description="Manage your construction documents, contracts, and technical files."
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
          <span>Add Document</span>
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
              placeholder="Search documents..."
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
        
        <DocumentList 
          documents={filteredDocuments}
          onEdit={(doc) => {
            setSelectedDocument(doc);
            setIsEditDialogOpen(true);
          }}
          onDelete={(id) => {
            const doc = documents.find(d => d.id === id);
            if (doc) {
              setSelectedDocument(doc);
              setIsDeleteDialogOpen(true);
            }
          }}
          onView={handleViewDocument}
        />
        
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredDocuments.length}</span> of <span className="font-medium">{documents.length}</span> documents
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
      <AddDocumentDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddDocument}
        isLoading={isLoading}
      />
      
      <EditDocumentDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditDocument}
        document={selectedDocument}
        isLoading={isLoading}
      />
      
      <DeleteDocumentDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteDocument}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default Documents;
