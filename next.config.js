module.exports = {
  trailingSlash: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/campaigns",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};
