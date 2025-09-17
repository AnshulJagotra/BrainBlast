import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BrainBlast',
    short_name: 'BrainBlast',
    description: 'Boost Your Brain, One Game at a Time',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3498db',
    icons: [
      {
        src: '/icons/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
