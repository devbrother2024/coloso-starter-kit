const path = require('path');

const customerLanguageCode = {
  EN: 'en',
  ZH_TW: 'zh-TW',
};

const kollus = {
  secretKey: '',
  userKey: '',
  introVideoKey: '',
};

const convertEnv = (nodeEnv) => {
  const envs = {
    local: 'local',
    development: 'development',
    staging: 'staging',
    qa: 'qa',
    production: 'production',
  };

  return envs[nodeEnv] || 'development';
};

const INTL_ENV = convertEnv(process.env.D1_ENV);

const env = {
  D1_ENV: INTL_ENV,
  currentEnv: INTL_ENV,
  KOLLUS_CUSTOM_KEY: kollus.userKey,
  GCS_LOCATION: process.env.GCS_LOCATION,
};

const isLocally = ['local', 'e2e', 'test'].includes(env.currentEnv);
const isProd = ['prod', 'production'].includes(env.currentEnv);

const gcsBucket = process.env.GCS_BUCKET_URL ?? '';
const assetPrefix = !isLocally ? gcsBucket : '';
const assetFavicon = isProd ? `${assetPrefix}/favicon.png` : `${assetPrefix}/${INTL_ENV}-favicon.png`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    emotion: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    loader: 'custom',
    loaderFile: './utils/imageLoader.ts',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    });

    return config;
  },
  env,
  async rewrites() {
    return ['/favicon.ico', '/favicon.png', '/favicon.jpg', '/favicon.jpeg'].flatMap((extension) => ({
      source: extension,
      destination: assetFavicon,
    }));
  },
  async redirects() {
    return Object.values(customerLanguageCode).flatMap((token) => [
      {
        source: `/${token}/account`,
        destination: `/${token}/account/classroom`,
        permanent: true,
      },
      {
        source: `/${token}/account/payment`,
        destination: `/${token}/account/payment/paid`,
        permanent: true,
      },
    ]);
  },
};

module.exports = nextConfig;
