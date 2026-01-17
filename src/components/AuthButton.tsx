'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (status === 'loading') {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 dark:bg-primary-700 rounded-md hover:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none text-gray-900 dark:text-gray-100"
      >
        {session?.user?.image ? (
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
              priority
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
        )}
        <span>{session?.user?.name}</span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          {session?.user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          {session?.user?.role === 'PASTOR' && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
