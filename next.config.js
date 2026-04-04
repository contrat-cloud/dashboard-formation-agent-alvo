/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/_dust/app/:path*", destination: "https://app.dust.tt/:path*" },
        { source: "/_dust/viz/:path*", destination: "https://viz.dust.tt/:path*" },
        { source: "/_dust/root/:path*", destination: "https://dust.tt/:path*" },
      ],
      afterFiles: [],
      fallback: [
        { source: "/:path*", destination: "https://app.dust.tt/:path*" },
      ],
    };
  },
};

module.exports = nextConfig;
