import redisClient from "./utils/redis";

(async () => {
  // Check if the connection to Redis is alive
  console.log(redisClient.isAlive());

  // Get the value stored in Redis for the key 'myKey'
  console.log(await redisClient.get("myKey"));

  // Set a value in Redis for the key 'myKey' with a duration of 5 seconds
  await redisClient.set("myKey", 12, 5);

  // Get the updated value from Redis for the key 'myKey'
  console.log(await redisClient.get("myKey"));

  // Wait for 10 seconds and then get the value from Redis for the key 'myKey'
  setTimeout(async () => {
    console.log(await redisClient.get("myKey"));
  }, 1000 * 10);
})();
