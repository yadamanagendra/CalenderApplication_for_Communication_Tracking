import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BarChart3, Building2, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-r from-blue-500 to-teal-400 p-4 shadow-lg">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-2xl font-extrabold text-white">Convo Track</h1>
          </div>
          <nav className="mt-6">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-label={`Navigate to ${item.name}`}
                    className={`group flex items-center rounded-md px-4 py-2 text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 flex-shrink-0 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
