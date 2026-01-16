/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => {
      return [
        {
          source: "/trpc/:path*",
          // eslint-disable-next-line no-undef
          destination: `${process.env.TRPC_URL}/:path*`,
        },
      ];
    },
  };
  
  export default nextConfig;