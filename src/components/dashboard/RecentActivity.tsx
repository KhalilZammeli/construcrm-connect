
import React from 'react';
import { 
  FileText, 
  Users, 
  Clipboard, 
  Calendar,
  CircleDollarSign
} from 'lucide-react';
import DashboardCard from './DashboardCard';
import { cn } from '@/lib/utils';

interface Activity {
  id: number;
  type: 'document' | 'client' | 'task' | 'meeting' | 'invoice';
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'document',
    title: 'Energy Certificate Generated',
    description: 'For project #32421 - Barcelona Apartment',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'client',
    title: 'New Client Registered',
    description: 'Inversiones Costa Dorada S.L.',
    time: '3 hours ago'
  },
  {
    id: 3,
    type: 'task',
    title: 'Task Added to Quote',
    description: 'Thermal insulation in Valencia office',
    time: '5 hours ago'
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Site Meeting Scheduled',
    description: 'With technical team at Marbella Villa',
    time: '1 day ago'
  },
  {
    id: 5,
    type: 'invoice',
    title: 'Invoice Paid',
    description: 'Invoice #INV-2023-42 - €12,540',
    time: '1 day ago'
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'document':
      return { 
        icon: FileText, 
        bg: 'bg-blue-100', 
        color: 'text-blue-600' 
      };
    case 'client':
      return { 
        icon: Users, 
        bg: 'bg-green-100', 
        color: 'text-green-600' 
      };
    case 'task':
      return { 
        icon: Clipboard, 
        bg: 'bg-amber-100', 
        color: 'text-amber-600' 
      };
    case 'meeting':
      return { 
        icon: Calendar, 
        bg: 'bg-purple-100', 
        color: 'text-purple-600' 
      };
    case 'invoice':
      return { 
        icon: CircleDollarSign, 
        bg: 'bg-emerald-100', 
        color: 'text-emerald-600' 
      };
    default:
      return { 
        icon: FileText, 
        bg: 'bg-gray-100', 
        color: 'text-gray-600' 
      };
  }
};

const RecentActivity: React.FC = () => {
  return (
    <DashboardCard title="Recent Activity">
      <div className="space-y-5">
        {activities.map((activity) => {
          const { icon: Icon, bg, color } = getActivityIcon(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start">
              <div className={cn("p-2 rounded-full", bg)}>
                <Icon size={14} className={color} />
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
};

export default RecentActivity;
