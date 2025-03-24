
import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import { PlusCircle, Search, Filter, MoreHorizontal, FileBarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample renovation tasks data
const tasks = [
  {
    id: 1,
    name: "Thermal Insulation - Exterior Walls",
    category: "Insulation",
    description: "Installation of SATE thermal insulation system for exterior facades",
    cost: 75.50,
    labor: 3.5,
    hasSubsidy: true
  },
  {
    id: 2,
    name: "Double Glazed Windows",
    category: "Carpentry",
    description: "Replacement of single glazed windows with double glazed, low-emission",
    cost: 320.00,
    labor: 2.0,
    hasSubsidy: true
  },
  {
    id: 3,
    name: "Aerothermal Heat Pump",
    category: "Heating",
    description: "Installation of high-efficiency aerothermal heat pump system",
    cost: 6500.00,
    labor: 16.0,
    hasSubsidy: true
  },
  {
    id: 4,
    name: "Solar Photovoltaic Panels",
    category: "Renewable Energy",
    description: "Installation of photovoltaic solar panels for electricity generation",
    cost: 8200.00,
    labor: 24.0,
    hasSubsidy: true
  },
  {
    id: 5,
    name: "LED Lighting Replacement",
    category: "Electrical",
    description: "Complete replacement of lighting fixtures with LED technology",
    cost: 18.50,
    labor: 0.5,
    hasSubsidy: false
  },
  {
    id: 6,
    name: "Smart Home System Installation",
    category: "Automation",
    description: "Installation of smart thermostats, lighting and energy monitoring",
    cost: 1200.00,
    labor: 8.0,
    hasSubsidy: false
  },
  {
    id: 7,
    name: "Underfloor Heating",
    category: "Heating",
    description: "Installation of water-based underfloor heating system",
    cost: 85.00,
    labor: 4.5,
    hasSubsidy: false
  },
  {
    id: 8,
    name: "Roof Insulation",
    category: "Insulation",
    description: "Thermal insulation for pitched or flat roofs",
    cost: 45.00,
    labor: 2.5,
    hasSubsidy: true
  }
];

const Tasks = () => {
  return (
    <Layout>
      <PageHeader 
        title="Renovation Tasks" 
        description="Manage renovation tasks for quotes and projects, including technical details and cost estimates."
      >
        <Button variant="outline" size="sm" className="gap-1">
          <FileBarChart size={16} />
          <span>Technical Library</span>
        </Button>
        <Button size="sm" className="gap-1">
          <PlusCircle size={16} />
          <span>New Task</span>
        </Button>
      </PageHeader>
      
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 w-full border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary/40">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cost (€/unit)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Labor (hours)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Subsidy
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y">
              {tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className="hover:bg-secondary/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{task.name}</div>
                    <div className="text-xs text-muted-foreground">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                      task.category === "Insulation" ? "bg-blue-100 text-blue-800" :
                      task.category === "Carpentry" ? "bg-amber-100 text-amber-800" :
                      task.category === "Heating" ? "bg-red-100 text-red-800" :
                      task.category === "Renewable Energy" ? "bg-green-100 text-green-800" :
                      task.category === "Electrical" ? "bg-purple-100 text-purple-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    €{task.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {task.labor.toFixed(1)}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.hasSubsidy ? (
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        Eligible
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800">
                        Not Eligible
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">8</span> of <span className="font-medium">42</span> tasks
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
    </Layout>
  );
};

export default Tasks;
