import type { NextConfig } from "next";

/* config options here */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Explicitly allow Unsplash
        port: "",
        pathname: "/**", // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
