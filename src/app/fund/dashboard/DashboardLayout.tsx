'use client';

import React, { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  User,
  LucideIcon,
  ChevronsRight,
  ChevronsLeft,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed: boolean;
}

const NavItem = ({ icon: Icon, label, href, isCollapsed }: NavItemProps) => (
  <Link href={href} className={`flex items-center p-3 my-1 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)] transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
    <Icon size={20} className="text-[var(--primary)]" />
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Programs', href: '/dashboard/programs' },
  ];

  return (
    <div className="flex h-screen bg-[var(--background-alt)]">
      {/* Left Sidebar */}
      <div 
        className={`
          flex flex-col bg-[var(--background)]
          h-full transition-all duration-300 border-r border-gray-200
          ${isCollapsed ? 'w-[70px]' : 'w-[240px]'}
        `}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Link href="/dashboard">
              {!isCollapsed ? (
                <Image
                  src="/dc_logo.png"
                  alt="Deliver Capital"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/dc_logo.png"
                  alt="Deliver Capital"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  priority
                />
              )}
            </Link>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              p-2 rounded-lg bg-gray-100 hover:bg-gray-200
              transition-colors duration-200
              ml-auto
            `}
          >
            {isCollapsed ? <ChevronsRight size={18} className="text-[var(--primary)]" /> : <ChevronsLeft size={18} className="text-[var(--primary)]" />}
          </button>
        </div>
        
        {/* Nav Items */}
        <nav className="flex-1 p-3">
          {navItems.map((item, index) => (
            <NavItem 
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isCollapsed={isCollapsed} 
            />
          ))}
        </nav>
        
        {/* User Profile */}
        <div className={`
          flex items-center p-3 border-t border-gray-200
          ${isCollapsed ? 'justify-center' : ''}
        `}>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={16} className="text-[var(--primary)]" />
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="font-medium truncate text-gray-800">Jane Smith</p>
              <p className="text-xs text-gray-500 truncate">Fund Admin</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Main content */}
          <div className="mt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 