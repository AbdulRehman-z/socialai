export const config = {
  env: {
    NODE_ENV: process.env.NODE_ENV!,
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    NEXT_PUBLIC_PROD_API_ENDPOINT: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    DATABASE_URL: process.env.DATABASE_URL!,
    upstash: {
      UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL!,
      UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN!,
      QSTASH_URL: process.env.QSTASH_URL!,
      QSTASH_TOKEN: process.env.QSTASH_TOKEN!,
    },
    RESEND_TOKEN: process.env.RESEND_TOKEN!,
  },
};
