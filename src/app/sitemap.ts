import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const paths = ['/', '/sluzby', '/cenik', '/znacky', '/vinarske', '/fotovoltaika', '/kontakt'];

  return paths.map(path => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 0.9 : 0.7,
  }));
}
