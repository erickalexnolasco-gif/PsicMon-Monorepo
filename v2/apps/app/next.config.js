/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@psicare/db",
    "@psicare/types",
    "@psicare/ui",
    "@psicare/billing",
    "@psicare/whatsapp",
    "@psicare/calendar",
    "@psicare/jobs",
  ],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "0b1a33cd-cc56-47a8-952b-57118cd8481a.preview.emergentagent.com",
        "0b1a33cd-cc56-47a8-952b-57118cd8481a.cluster-12.preview.emergentcf.cloud",
      ],
      allowedForwardedHosts: [
        "localhost:3000",
        "0b1a33cd-cc56-47a8-952b-57118cd8481a.preview.emergentagent.com",
        "0b1a33cd-cc56-47a8-952b-57118cd8481a.cluster-12.preview.emergentcf.cloud",
      ],
    },
  },
};

module.exports = nextConfig;
