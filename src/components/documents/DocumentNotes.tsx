
import React, { useState } from 'react';
import { Document } from './DocumentForm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, PlusCircle, User } from 'lucide-react';
import { format } from 'date-fns';

export interface Note {
  id: number;
  text: string;
  createdAt: string;
  documentId: number;
  user: {
    name: string;
    avatar?: string;
  };
}

interface DocumentNotesProps {
  document: Document | null;
  notes: Note[];
  onAddNote: (note: string) => void;
}

const DocumentNotes: React.FC<DocumentNotesProps> = ({ document, notes, onAddNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted/20 rounded-lg border border-dashed p-6">
        <StickyNote size={32} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No document selected</h3>
        <p className="text-sm text-muted-foreground text-center">
          Select a document to view and add notes
        </p>
      </div>
    );
  }

  const documentNotes = notes.filter(note => note.documentId === document.id);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Document Notes</h3>
        <p className="text-sm text-muted-foreground">
          Add notes and comments about {document.title}
        </p>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {documentNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-1/2 text-center p-6">
            <StickyNote size={32} className="text-muted-foreground mb-4" />
            <h4 className="text-sm font-medium">No notes yet</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Add the first note for this document
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documentNotes.map((note) => (
              <div key={note.id} className="bg-card p-3 rounded-lg border shadow-sm">
                <div className="flex gap-2 items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{note.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(note.createdAt), 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                </div>
                <p className="text-sm whitespace-pre-wrap">{note.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t bg-muted/10">
        <form onSubmit={handleSubmit}>
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="min-h-24 mb-2"
          />
          <Button 
            type="submit" 
            className="w-full gap-1"
            disabled={!newNote.trim()}
          >
            <PlusCircle size={16} />
            Add Note
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DocumentNotes;
