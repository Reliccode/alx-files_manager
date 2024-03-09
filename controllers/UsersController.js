import sha1 from 'sha1';
import express from 'express';
// import bodyParser from 'body-parser';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// Create Express app instance
const app = express();

// Configure ExpressApp to parse JSON request bodies
app.use(express.json());

/**
 * Controller for handling user-related operations
 */
class UsersController {
  /**
     * Create a new user
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     */
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if user with the same email aready exists
      const userExists = await dbClient.db.collection('users').findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the passwrd using SHA1
      const hashedPassword = sha1(password);

      // Create new user object
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Insert new user into db
      const result = await dbClient.db.collection('users').insertOne(newUser);

      // Extract inserted users id
      const { _id } = result.ops[0];

      // Respond with new users id and email
      return res.status(201).json({ id: _id, email });
    } catch (error) {
      console.error('Error creating new user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrive the user based on the token
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  static async getMe(req, res) {
    const { token } = req.headers;
    console.log('Token:', token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    console.log('UserID from Redis:', userId);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await dbClient.db.collection('users').findOne({ _id: userId });
    console.log('User from DB:', user);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(200).json({ id: user._id, email: user.email });
  }
}

export default UsersController;
