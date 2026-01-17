import { headers } from 'next/headers';

export interface SiteConfig {
  id?: string;
  name: string;
  titleHeader: string;
  titleSubHeader: string;
  description: string;
  logo: string;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const headersList = await headers();
  const siteName = headersList.get('x-site-name') || 'CHIF';
  
  // Map site name to site ID (you may want to make this dynamic)
  const siteNameToIdMap: Record<string, string> = {
    'CHIF': 'cmkhlzt3t00018oe99wtwn94p', // CHIF site ID
    'CHAG': 'cmkhlzt2000008oe92cxsrcej', // CHAG site ID
  };
  
  return {
    id: siteNameToIdMap[siteName],
    name: siteName,
    titleHeader: headersList.get('x-site-title-header') || 'City Harvest',
    titleSubHeader: headersList.get('x-site-title-subheader') || 'International Fellowship',
    description: headersList.get('x-site-description') || 'A welcoming Christian community in the heart of the city.',
    logo: headersList.get('x-site-logo') || '/images/logo.png',
  };
}
