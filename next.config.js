/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['corvex.com', 'api.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'website.usecorvex.com',
      },
      {
        protocol: 'https',
        hostname: 'payload.usecorvex.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-cc505a2fce45490cb821f638d2b5bd76.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      // Add your WordPress domain pattern here if using a custom domain
      // Example: { protocol: 'https', hostname: 'your-wordpress-site.com' }
      // Or use: { protocol: 'https', hostname: '**' } to allow all domains (less secure)
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product',
        destination: '/features',
        permanent: true,
      },
    ]
  },

  // Webpack optimization
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },

  // Enable experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion'
    ],
  },
}

module.exports = nextConfig