import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.SERVICES_HOST,
      port: process.env.REDIS_MASK_PORT,
      password: process.env.REDIS_PASSWORD,
    },
  },
} as ICacheConfig;
