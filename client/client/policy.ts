export const site = {
  CLIENT_ID: 'coloso:client:starter-kit',
  LOCAL_ACCESS_TOKEN: 'starter-kit-access-token',
  LANGUAGE_TOKEN: 'starter-kit-language-token',
  DEFAULT_LANGUAGE: 'en',
  SCOPE: 'starterKit',
};

export const apiServer = `http://localhost:8080`;

export const env = process.env.currentEnv as string;

export const isProd = ['prod', 'production'].includes(env);

export const isLocal = env === 'local';

export const isE2E = env === 'e2e';

export const gcsBucket = process.env.GCS_BUCKET_URL;

export const assetPrefix = !isLocal ? gcsBucket : '';

export const getFavicon = () => {
  return isProd ? `${assetPrefix}/favicon.png` : `${assetPrefix}/${env}-favicon.png`;
};

export const getAppleIcon = () => {
  return isProd ? `${assetPrefix}/apple-icon.png` : `${assetPrefix}/${env}-apple-icon.png`;
};

export const meta = {
  title: 'Stater Kit.',
  description: 'Online Class From Industry-Leading Experts. Join for Free',
  keywords:
    '3d animation, 3d designer, 2d animation course, animation courses, animation design, animating, digital art classes, drawing class, digital painting course, online arts classes, grapic design, motion grapichs, learn illustration, Blender, cinema 4d, 3d character design, character illustration, 3d character',
  image: `${assetPrefix}/starter-kit-opengraph.png`,
  url: 'https://starter-kit.global',
};
