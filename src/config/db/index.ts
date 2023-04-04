import { createClient } from "redis";
import config from "@config";

const redisOption = {
  password: config.redis.password,
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
};

const client = createClient(redisOption);

export async function connect() {
    client.on("error", (err) => console.error("Redis Client Error", err));
    await client.connect();
}

export default client
