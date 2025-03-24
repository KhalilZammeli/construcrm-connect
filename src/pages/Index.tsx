
import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ClientsOverview from '@/components/dashboard/ClientsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <PageHeader 
        title="Dashboard" 
        description="Welcome to the ConstruCRM dashboard. Here's an overview of your construction business."
      >
        <Button size="sm" className="gap-1">
          <PlusCircle size={16} />
          <span>New Client</span>
        </Button>
      </PageHeader>
      
      <div className="space-y-6">
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClientsOverview />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
