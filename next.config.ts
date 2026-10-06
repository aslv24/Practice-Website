import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/file-upload",
        destination: "/files",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
