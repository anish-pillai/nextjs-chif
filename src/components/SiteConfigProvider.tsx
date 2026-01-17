'use client';

import { createContext, useContext } from 'react';

export interface SiteConfig {
  name: string;
  titleHeader: string;
  titleSubHeader: string;
  description: string;
  logo: string;
}

interface SiteConfigContextType {
  siteConfig: SiteConfig;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ 
  children, 
  siteConfig 
}: { 
  children: React.ReactNode;
  siteConfig: SiteConfig;
}) {
  return (
    <SiteConfigContext.Provider value={{ siteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context.siteConfig;
}
