
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {description}
          </p>
        )}
      </div>
      
      {children && (
        <div className="mt-4 md:mt-0 flex gap-3 sm:justify-end">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
