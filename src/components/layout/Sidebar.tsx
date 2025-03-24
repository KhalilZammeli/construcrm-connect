
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  ClipboardList, 
  FileText, 
  Settings, 
  Calculator, 
  HardHat, 
  CircleDollarSign, 
  BuildingIcon  
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const navSections: NavSection[] = [
    {
      label: 'Main',
      items: [
        { icon: BarChart3, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Clients', path: '/clients' },
        { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
        { icon: FileText, label: 'Documents', path: '/documents' }
      ]
    },
    {
      label: 'Roles',
      items: [
        { icon: BuildingIcon, label: 'Back Office', path: '/back-office' },
        { icon: HardHat, label: 'Engineer', path: '/engineer' },
        { icon: CircleDollarSign, label: 'Billing', path: '/billing' }
      ]
    },
    {
      label: 'System',
      items: [
        { icon: Settings, label: 'Settings', path: '/settings' }
      ]
    }
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 bg-sidebar text-sidebar-foreground flex flex-col z-30 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 md:w-20"
      )}
    >
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
        {isOpen ? (
          <h1 className="text-xl font-bold animate-fade-in">ConstruCRM</h1>
        ) : (
          <div className="hidden md:flex md:items-center md:justify-center w-full">
            <span className="text-xl font-bold">C</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto scrollbar-thin">
        {navSections.map((section, index) => (
          <div key={index} className="px-4 mb-6">
            {isOpen && (
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60 mb-3 ml-2">
                {section.label}
              </h2>
            )}
            
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                  
                return (
                  <li key={itemIndex}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md transition-all-200",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon size={20} className={cn(
                        isOpen ? "mr-3" : "mx-auto"
                      )} />
                      {isOpen && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {isOpen ? (
          <div className="flex items-center px-3 py-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <BuildingIcon size={14} className="text-sidebar-primary" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-sidebar-foreground">Construction Pro</p>
              <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex md:justify-center">
            <BuildingIcon size={20} className="text-sidebar-foreground/60" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
