import redis from 'redis';

/**
 * Class representing a Redis client.
 */

class RedisClient {
  /**
   * Create a Redis client.
   */

  constructor() {
    // Create a new Redis client
    this.client = redis.createClient();
    this.client.connected = true;

    // Handle error events
    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    this.client.on('connect', () => {
      this.client.connected = true;
    });
  }

  /**
   * Check if the connection to Redis is alive.
   * @returns {boolean} True if connection is alive, otherwise false.
   */
  isAlive() {
    // Check if the client is connected
    return this.client.connected;
  }

  /**
   * Get the value stored in Redis for a given key
   * @param {string} key - The key to retrive the value for
   * @returns {Promise<any>} A promise that resolves to value stored in Redis for given key
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      // Get the value for the key
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Set a value in Redis for a given key with an expiration
   * @param {string} key - The key to the set the value for
   * @param {any} value - The value to store in Redis
   * @param {number} duration -The expiration duration in secs
   * @returns {Promise<void>} A promise that resolves when value is successfully set in Redis
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      // Set the value with expiration
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Delete the value store in Redis for a given key
   * @param {string} key - The key to delete the value for
   * @returns {Promise<void>} promise that reolves when value is successfuly deleted 4rm Redis
   */
  async del(key) {
    return new Promise((resolve, reject) => {
      // Delete value for the key
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Create and export an instance of RedisCleint
const redisClient = new RedisClient();
export default redisClient;
