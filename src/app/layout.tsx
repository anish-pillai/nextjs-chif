import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from '@/components/SessionProvider';
import { Navigation } from '@/components/Navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import AuthButton from '@/components/AuthButton';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'City Harvest International Fellowship',
  description: 'A welcoming Christian community in the heart of the city.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
            <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
              <div className="container mx-auto px-2 h-16 flex items-center justify-between">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2 mr-8">
                  <Image
            src="/images/logo.png"
            alt="CHIF Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
                    <span className="text-xl font-bold">CHIF</span>
                  </Link>
                  <Navigation />
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <Link
                    href="/give"
                    className="hidden md:flex items-center space-x-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Give</span>
                  </Link>
                  <AuthButton />
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="pt-16">
              {children}
            </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}