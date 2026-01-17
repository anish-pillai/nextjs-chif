import { headers } from 'next/headers';

export interface SiteConfig {
  name: string;
  titleHeader: string;
  titleSubHeader: string;
  description: string;
  logo: string;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const headersList = await headers();
  
  return {
    name: headersList.get('x-site-name') || 'CHIF',
    titleHeader: headersList.get('x-site-title-header') || 'City Harvest',
    titleSubHeader: headersList.get('x-site-title-subheader') || 'International Fellowship',
    description: headersList.get('x-site-description') || 'A welcoming Christian community in the heart of the city.',
    logo: headersList.get('x-site-logo') || '/images/logo.png',
  };
}
