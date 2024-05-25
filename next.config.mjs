
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
    images:{
        domains:['lh3.googleusercontent.com']
    }
};

module.exports = nextConfig;
