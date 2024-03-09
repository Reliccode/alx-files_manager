import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
// import { ObjectId } from 'mongodb';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AuthController {
  /**
     * Sign in the user by generating a new authentication token
     * @param {Request} req - The request object
     * @param {Response} res - The Response object
     */
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized ' });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [email, password] = auth.split(':');
    const hashedPassword = sha1(password);

    // Check if user with the provided credentials exists
    const user = await dbClient.db.collection('users').findOne({ email, password: hashedPassword });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Generate a random token
    const token = uuidv4();
    console.log('Generated token:', token);

    // Store the User ID in redis with the token as key
    const expirationTimeSeconds = 60 * 60 * 24; // 24 hrs in seconds
    await redisClient.set(`auth_${token}`, user._id.toString(), expirationTimeSeconds);

    return res.status(200).json({ token });
  }

  /**
     * Sign out the user based on the token
     * @param {Request} req - The request body
     * @param {Response} res - Response body
     */
  static async getDisconnect(req, res) {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if token exists in redis
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Delete token from redis
    await redisClient.del(`auth_${token}`);

    return res.status(204).send();
  }
}

export default AuthController;
