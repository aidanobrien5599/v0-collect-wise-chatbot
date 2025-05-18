/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Keep your existing webpack config
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
  // Critical for native dependencies
  output: 'standalone',
  experimental: {
    // Include all BAML packages
    serverComponentsExternalPackages: [
      '@boundaryml/baml-node',
      '@boundaryml/baml-darwin-arm64',
      '@boundaryml/baml-darwin-x64',
      '@boundaryml/baml-linux-arm64-gnu',
      '@boundaryml/baml-linux-arm64-musl',
      '@boundaryml/baml-linux-x64-gnu',
      '@boundaryml/baml-linux-x64-musl',
      '@boundaryml/baml-win32-arm64-msvc',
      '@boundaryml/baml-win32-x64-msvc'
    ],
  },
}

export default nextConfig
