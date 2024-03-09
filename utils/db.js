import { MongoClient } from 'mongodb';

/**
 * Class representing a MongoDB client.
 */
class DBClient {
  /**
     * Create a MongoDB client
     */
  constructor() {
    // MongoDB connection options
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a new MongoDB client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.db = null;

    // Connect to MongoDB
    this.connect();
  }

  /**
   * Connect to MongoDB
   */
  async connect() {
    try {
      // Connect to MongoDB
      await this.client.connect();
      // Select the db
      this.db = this.client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Check if the connection to MongoDB is alive
   * @returns {boolean} True if connection is alive, otherwise false
   */
  isAlive() {
    return !!this.db;
  }

  /**
   * Get the number of documents in the users collection
   * @returns {Promise<number>} Promise that resolves to number of docs in users collection
   */
  async nbUsers() {
    try {
      // Count the docs in the users collection
      return await this.db.collection('users').countDocuments();
    } catch (error) {
      console.error('Error counting documents in users collection:', error);
      throw error;
    }
  }

  /**
   * Get the num of docs in files collection
   * @returns {Promise<number>} Promise that resolves to num of docs in files collection
   */
  async nbFiles() {
    try {
      // Count docs in files collection
      return await this.db.collection('files').countDocuments();
    } catch (error) {
      console.error('Error counting documents in the files collection:', error);
      throw error;
    }
  }
}

// Create and export an instance of DBCleint
const dbClient = new DBClient();
export default dbClient;
