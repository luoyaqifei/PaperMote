// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "",
        pathname: "/books/content**",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        port: "",
        pathname: "/books/content**",
      },
    ],
  },
  crossOrigin: "anonymous",
};

export default nextConfig;
