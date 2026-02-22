import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AlephDavening — Master the Art of Davening',
    short_name: 'AlephDavening',
    description:
      'Learn to daven with confidence, keep up in shul, and lead from the amud.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FEFDFB',
    theme_color: '#1B4965',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
