import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oja.tea blog',
    short_name: 'oja.tea',
    description: 'Discover tons of Matcha and Japanese green tea cocktail recipes all in one progressive web application.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F2F2F2',
    theme_color: '#8A972A',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
