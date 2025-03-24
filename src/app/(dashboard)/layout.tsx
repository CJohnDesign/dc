'use client';

import Link from 'next/link';
import { use, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '../(dashboard)/(login)/actions';
import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  if (!user) {
    return (
      <Button
        asChild
        className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-sm px-4 py-2 rounded-full"
      >
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={`${user.firstName || ''} ${user.lastName || ''}`} />
          <AvatarFallback>
            {user.email
              ? user.email
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
              : 'U'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">1</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col gap-2 p-2">
          <div className="font-medium">Notifications</div>
          <div className="text-sm p-3 bg-muted/50 rounded-md">
            Your funding application is being reviewed.
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo href="/" className="text-xl" />
          {user && (
            <div className="ml-8 text-foreground font-medium">
              Welcome back, <span className="text-primary">{user.firstName || 'Admin'}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <Button 
              asChild 
              variant="default" 
              size="default"
              className="rounded-full px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              <Link href="/assessment">
                Get Funded Today
              </Link>
            </Button>
          )}
          <div className="flex items-center space-x-3">
            {user && <NotificationBell />}
            <Suspense fallback={<div className="h-9" />}>
              <UserMenu />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
