
import React from 'react';
import { Users, Briefcase, ClipboardList, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  positive?: boolean;
  iconColor?: string;
  iconBgColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  positive,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10"
}) => {
  return (
    <div className="relative flex items-center p-5 overflow-hidden bg-white rounded-lg border shadow-sm transition-all duration-200 hover:shadow">
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full shrink-0",
        iconBgColor
      )}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      
      <div className="ml-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-semibold mt-1">{value}</h4>
        
        {change && (
          <p className={cn(
            "text-xs font-medium mt-1",
            positive ? "text-green-600" : "text-red-600"
          )}>
            {positive ? "+" : ""}{change}
          </p>
        )}
      </div>
      
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-primary/5 to-transparent" />
    </div>
  );
};

const DashboardMetrics: React.FC = () => {
  const metrics = [
    { 
      title: "Total Clients", 
      value: 124, 
      change: "12%", 
      icon: Users, 
      positive: true,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100" 
    },
    { 
      title: "Active Projects", 
      value: 34, 
      change: "8%", 
      icon: Briefcase, 
      positive: true,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"  
    },
    { 
      title: "Task Items", 
      value: 256, 
      change: "5%", 
      icon: ClipboardList, 
      positive: false,
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-100"  
    },
    { 
      title: "Documents", 
      value: 1254, 
      change: "24%", 
      icon: FileText, 
      positive: true,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100"  
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default DashboardMetrics;
