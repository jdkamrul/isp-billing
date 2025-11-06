// This file was empty. Populating with Sidebar component.
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Package, Settings, SlidersHorizontal, Wifi } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Packages', href: '/packages', icon: Package },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Router Controls', href: '/router-controls', icon: SlidersHorizontal },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC<{ isSidebarOpen: boolean, onSidebarClose: () => void }> = ({ isSidebarOpen, onSidebarClose }) => {

  const NavItem: React.FC<{ item: typeof navigation[0] }> = ({ item }) => (
     <NavLink
        to={item.href}
        end={item.href === '/'}
        onClick={onSidebarClose}
        className={({ isActive }) =>
            `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
            ${
            isActive
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
        }
    >
      <item.icon className="mr-3 h-5 w-5" />
      {item.name}
    </NavLink>
  );

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={onSidebarClose}
      />
      <div className={`fixed z-40 inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-200 ease-in-out`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
           <Wifi className="h-8 w-8 text-primary-500"/>
           <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">ISP Admin</span>
        </div>
        <nav className="p-4 space-y-2">
            {navigation.map((item) => <NavItem key={item.name} item={item} />)}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;