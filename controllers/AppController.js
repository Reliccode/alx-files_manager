import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/**
 * Controller for handling API endpoints related to app status and statistics
 */
class AppController {
  /**
     * Get status of Redis and DB
     * @param {express.Request}  req - Express request object
     * @param {express.Response} res - Express response object
     * @returns {void}
     */
  static async getStatus(req, res) {
    try {
      // Check if Redis and DB are alive
      const redisAlive = redisClient.isAlive();
      const dbAlive = dbClient.isAlive();

      // Return status with 200 OK
      res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      console.error('Error getting status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Get statistics of users and files
   * @param {express.Request} req - Epress req object
   * @param {express.Response} res - Express response object
   * @returns {void}
   */
  static async getStats(req, res) {
    try {
      // Get num of users and files
      const numUsers = await dbClient.nbUsers();
      const numFiles = await dbClient.nbFiles();

      // Return stats with 200 OK
      res.status(200).json({ users: numUsers, files: numFiles });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
