
import React from 'react';
import { FileText, FileImage, FileArchive, Film, Music, File } from 'lucide-react';
import { Document } from './DocumentForm';
import { cn } from '@/lib/utils';

interface DocumentPreviewProps {
  document: Document | null;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted/20 rounded-lg border border-dashed p-12">
        <File size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No document selected</h3>
        <p className="text-sm text-muted-foreground">Select a document to preview its contents</p>
      </div>
    );
  }

  const getFileIcon = () => {
    const type = document.fileType?.toLowerCase();
    switch (type) {
      case 'pdf':
        return <FileText size={48} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <FileImage size={48} />;
      case 'zip':
      case 'rar':
        return <FileArchive size={48} />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Film size={48} />;
      case 'mp3':
      case 'wav':
        return <Music size={48} />;
      default:
        return <File size={48} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={cn("flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary")}>
            {getFileIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg">{document.title}</h3>
            <p className="text-sm text-muted-foreground">
              {document.fileType?.toUpperCase()} · {document.fileSize}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-muted/10">
        {document.file ? (
          <div>
            {/^image\/(jpeg|jpg|png|gif)$/i.test(document.file.type) ? (
              <img 
                src={URL.createObjectURL(document.file)} 
                alt={document.title}
                className="max-w-full mx-auto border rounded-lg shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center justify-center bg-white rounded-lg border p-12">
                <div className="text-primary mb-4">
                  {getFileIcon()}
                </div>
                <h3 className="text-lg font-medium mb-2">{document.fileName || `${document.title}.${document.fileType}`}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This file type cannot be previewed directly.
                </p>
                {document.file && (
                  <a 
                    href={URL.createObjectURL(document.file)} 
                    download={document.fileName || `${document.title}.${document.fileType}`}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Download File
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-white/50 rounded-lg border border-dashed p-12">
            <div className="text-muted-foreground mb-4">
              {getFileIcon()}
            </div>
            <h3 className="text-lg font-medium">Document Preview</h3>
            <p className="text-sm text-muted-foreground text-center">
              {document.description || "No detailed preview available for this document."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
