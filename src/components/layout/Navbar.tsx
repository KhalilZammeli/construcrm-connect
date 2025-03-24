
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-4 rounded-full hover:bg-secondary transition-all-200"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-muted-foreground" />
          </button>
          
          <div className={cn(
            "relative transition-all duration-300",
            searchFocused ? "w-64" : "w-48"
          )}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={cn(
                "w-full py-2 pl-10 pr-4 text-sm bg-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300",
                searchFocused ? "bg-white border border-input" : ""
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative p-2 rounded-full hover:bg-secondary transition-all-200"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div className="h-8 w-px bg-border mx-1"></div>
          
          <div className="flex items-center">
            <button className="flex items-center space-x-3 p-1 rounded-full hover:bg-secondary transition-all-200">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
