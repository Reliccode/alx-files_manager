import express from 'express';
import routes from './routes/index';

// Create Express app
const app = express();

// Set port from enviroment variable or default to 5000
const PORT = process.env.PORT || 5000;

//  Middleware to parse JSON request bodies
app.use(express.json());

// Load all routes from routes/index.js
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
