const config = {
  email: {
    address: process.env.EMAIL!,
    password: process.env.PASSWORD!,
  },
  port: process.env.PORT ?? 3000,
  redis: {
    host: process.env.REDIS_HOST!,
    password: process.env.REDIS_PASSWORD!,
    port: Number(process.env.REDIS_PORT!),
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expires: process.env.JWT_EXPIRES_IN ?? '5m',
  },
};

export default config;
