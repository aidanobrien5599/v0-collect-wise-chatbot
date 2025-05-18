/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // This is necessary for native modules to work with Next.js
    if (isServer) {
      config.externals.push(
        '@boundaryml/baml-darwin-arm64',
        '@boundaryml/baml-darwin-x64',
        '@boundaryml/baml-linux-arm64-gnu',
        '@boundaryml/baml-linux-arm64-musl',
        '@boundaryml/baml-linux-x64-gnu',
        '@boundaryml/baml-linux-x64-musl',
        '@boundaryml/baml-win32-arm64-msvc',
        '@boundaryml/baml-win32-x64-msvc'
      );
    }
    
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
