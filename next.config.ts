import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: "/alpha-test",
  images: {
    domains: ['i1.sndcdn.com', "is1-ssl.mzstatic.com", "i.scdn.co", "upload.wikimedia.org", "cdns-images.dzcdn.net",],
    unoptimized: true,    
  },
};

export default nextConfig;
