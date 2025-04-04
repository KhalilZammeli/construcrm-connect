
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
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import DocumentPreview from '@/components/documents/DocumentPreview';
import DocumentNotes, { Note } from '@/components/documents/DocumentNotes';

// Initial mock notes data
const initialNotes: Note[] = [
  {
    id: 1,
    text: "This building permit application looks good. We should proceed with the submission process.",
    createdAt: "2023-07-15T09:30:00Z",
    documentId: 1,
    user: {
      name: "Emma Rodriguez",
    }
  },
  {
    id: 2,
    text: "We need to make some revisions to section 3.2 of this report before final submission.",
    createdAt: "2023-08-06T14:20:00Z",
    documentId: 2,
    user: {
      name: "Daniel Chen",
    }
  }
];

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
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

  const handleAddDocument = async (values: DocumentFormValues, file?: File) => {
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
        fileType: values.fileType || 'pdf',
        fileName: values.fileName || `document-${Date.now()}.${values.fileType || 'pdf'}`,
        file: file
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

  const handleEditDocument = async (id: number, values: DocumentFormValues, file?: File) => {
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
                fileName: values.fileName || doc.fileName,
                file: file || doc.file,
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
      // Also remove notes related to this document
      setNotes(prev => prev.filter(note => note.documentId !== selectedDocument.id));
      
      if (selectedDocument.id === selectedDocument?.id) {
        setSelectedDocument(null);
      }
      
      toast.success("Document deleted successfully!");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = (noteText: string) => {
    if (!selectedDocument) return;
    
    const newNote: Note = {
      id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
      text: noteText,
      createdAt: new Date().toISOString(),
      documentId: selectedDocument.id,
      user: {
        name: "Current User" // In a real app, this would come from auth context
      }
    };
    
    setNotes(prev => [...prev, newNote]);
    toast.success("Note added");
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
      
      {/* Main content with split-screen layout */}
      <div className="h-[calc(100vh-170px)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Document list panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden h-full flex flex-col">
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
              
              {/* Make document list scrollable */}
              <div className="overflow-auto flex-1">
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
                  onView={(id) => {
                    const doc = documents.find(d => d.id === id);
                    if (doc) {
                      setSelectedDocument(doc);
                    }
                  }}
                />
              </div>
              
              <div className="px-6 py-4 border-t flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredDocuments.length}</span> of <span className="font-medium">{documents.length}</span> documents
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Preview and notes panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Document preview panel */}
              <ResizablePanel defaultSize={60}>
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden h-full">
                  <DocumentPreview document={selectedDocument} />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Notes panel */}
              <ResizablePanel defaultSize={40}>
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden h-full">
                  <DocumentNotes 
                    document={selectedDocument} 
                    notes={notes}
                    onAddNote={handleAddNote}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
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
