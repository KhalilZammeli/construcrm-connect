
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  className,
  children,
  footer,
  noPadding = false,
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg border shadow-sm overflow-hidden",
      className
    )}>
      <div className="px-5 py-4 border-b">
        <h3 className="font-medium">{title}</h3>
      </div>
      
      <div className={cn(
        "animate-fade-in",
        noPadding ? "" : "p-5"
      )}>
        {children}
      </div>
      
      {footer && (
        <div className="bg-secondary/50 px-5 py-3 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
