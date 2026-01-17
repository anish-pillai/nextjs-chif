'use client';

import { useState, useEffect } from 'react';

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  logo: string;
}

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    name: 'CHIF',
    title: 'City Harvest INternational Fellowship',
    description: 'A welcoming Christian community in the heart of the city.',
    logo: '/images/logo.png',
  });

  useEffect(() => {
    // In a real implementation, this would be passed from the server
    // For now, we'll use the defaults since the middleware handles the server-side changes
    // The actual site-specific rendering is handled by the layout component
  }, []);

  return siteConfig;
}
