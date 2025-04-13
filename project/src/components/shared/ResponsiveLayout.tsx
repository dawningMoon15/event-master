import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import RoleBasedNav from './RoleBasedNav';
import { useTheme } from '../../theme/ThemeProvider';

interface ResponsiveLayoutProps {
  role: string;
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ role, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-secondary/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-text hover:text-accent"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-bold text-text">EventMaster</h1>
          <button
            onClick={toggleTheme}
            className="text-text hover:text-accent"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Hidden on mobile when closed */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-secondary/50 backdrop-blur-sm border-r border-border transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border hidden lg:flex items-center justify-between">
              <h1 className="text-xl font-bold text-text">EventMaster</h1>
              <button
                onClick={toggleTheme}
                className="text-text hover:text-accent"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <RoleBasedNav role={role} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveLayout; 