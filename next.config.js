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
    return {
      beforeFiles: [
        {
          source: "/dp/:path*",
          destination: "https://app.dust.tt/:path*",
        },
        {
          source: "/dv/:path*",
          destination: "https://viz.dust.tt/:path*",
        },
      ],
      afterFiles: [],
      fallback: [
        {
          source: "/:path*",
          destination: "https://app.dust.tt/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
