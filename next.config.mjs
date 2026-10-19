/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-pw.pixieset.com',
      },
      {
        protocol: 'https',
        hostname: 'assets-pw.pixieset.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/galleryofemotions',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/corporates',
        destination: '/corporate',
        permanent: true,
      },
      {
        source: '/cinematic-heirlooms/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/cinematic-heirlooms',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/gallery-of-emotions',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/feature-films',
        destination: '/films',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
