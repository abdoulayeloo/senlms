'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
};

interface NavbarProps {
  brandName?: string;
}

const Navbar: FC<NavbarProps> = ({ brandName = 'LMS Platform' }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard" className="text-white font-bold text-xl">
                {brandName}
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/dashboard/courses">Courses</NavLink>
                <NavLink href="/dashboard/assignments">Assignments</NavLink>
                <NavLink href="/dashboard/attendance">Attendance</NavLink>
                <NavLink href="/dashboard/payments">Payments</NavLink>
                <NavLink href="/dashboard/resources">Resources</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-indigo-600 p-1 rounded-full text-white hover:bg-indigo-500 focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm text-white hover:bg-indigo-500 focus:outline-none"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              {user && (
                <button
                  onClick={handleSignOut}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;