import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

// Create router
const router = express.Router();
const app = express(); // Express app instance

// Configure express app to parse JSON request bodies
app.use(express.json());

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Endpoint to create a new user
router.post('/users', UsersController.postNew);

// Endpoints for authentication
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

// Endpoint for uploading files
router.post('/files', FilesController.postUpload);

export default router;
