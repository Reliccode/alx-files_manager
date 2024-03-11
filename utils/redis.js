// utils/redis.js

const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });

    // Ensure that the client is connected before using it
    if (process.env.NODE_ENV !== 'test') {
      this.client.on('connect', () => {
        console.log('Connected to Redis');
      });
    }
  }

  async isAlive() {
    // Ping Redis to check if it's alive
    return new Promise((resolve) => {
      this.client.ping('PING', (err) => {
        if (err) resolve(false);
        else resolve(true);
      });
    });
  }

  async get(key) {
    // Get value from Redis for the given key
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    // Set value in Redis with expiration time
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  async del(key) {
    // Delete value from Redis for the given key
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
