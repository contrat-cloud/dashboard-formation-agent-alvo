/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/dp/:path*",
        destination: "https://app.dust.tt/:path*",
      },
      {
        source: "/dv/:path*",
        destination: "https://viz.dust.tt/:path*",
      },
      {
        source: "/assets/:path*",
        destination: "https://app.dust.tt/assets/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/dp/:path*",
        destination: "https://app.dust.tt/:path*",
      },
      {
        source: "/dv/:path*",
        destination: "https://viz.dust.tt/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
