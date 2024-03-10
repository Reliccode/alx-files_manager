import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class FilesController {
  /**
     * Create new file in db and on disk
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     */
  static async postUpload(req, res) {
    const {
      name, type, parentId = 0, isPublic = false, data,
    } = req.body;

    // Retrive user based on token
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate input parameters
    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    const acceptedTypes = ['folder', 'file', 'image'];
    if (!type || !acceptedTypes.includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if (!data && type !== 'folder') {
      return res.status(400).json({ error: 'Missing data' });
    }

    // Parent validation
    if (parentId !== 0) {
      const parentFile = await dbClient.db.collection('files').findOne({ _id: parentId });
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder ' });
      }
    }

    // Create folder if it doesnt exist
    const filePath = process.env.FOLDER_PATH || '/tmp/files_manager';
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    // FIle creation
    const fileDocument = {
      userId,
      name,
      type,
      isPublic,
      parentId,
    };

    if (type !== 'folder') {
      // Store file on disk
      const filePath = process.env.FOLDER_PATH || '/tmp/files_manager';
      const fileId = uuidv4();
      const absolutePath = `${filePath}/${fileId}`;
      fs.writeFileSync(absolutePath, Buffer.from(data, 'base64'));

      fileDocument.localPath = absolutePath;
    }

    // Insert file document into database
    const result = await dbClient.db.collection('files').insertOne(fileDocument);

    return res.status(201).json({ id: result.ops[0]._id, ...fileDocument });
  }
}

export default FilesController;
