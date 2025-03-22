'use client';

import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Ministries',
    href: '/ministries',
    children: [
      { name: 'Youth Ministry', href: '/ministries/youth' },
      { name: "Children's Ministry", href: '/ministries/children' },
      { name: 'Adult Ministry', href: '/ministries/adult' },
    ],
  },
  { name: 'Events', href: '/events' },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Connect', href: '/connect' },
  { name: 'Give', href: '/give' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex-1">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navigation.map((item) => (
          <div key={item.name} className="relative group">
            {item.children ? (
              <>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-800 ${                    isActive(item.href) ? 'text-primary-600 dark:text-primary-400' : ''
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(item.href) ? 'text-primary-600 dark:text-primary-400' : ''
                }`}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                        aria-expanded={mobileDropdown === item.name}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <ChevronDown className={`h-4 w-4 transform transition-transform ${
                            mobileDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </button>
                      {mobileDropdown === item.name && (
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileDropdown(null);
                              }}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        isActive(item.href) ? 'text-primary-600 dark:text-primary-400' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}