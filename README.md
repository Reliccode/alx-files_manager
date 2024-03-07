## README.md

### 0x04. Files manager

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination, and background processing.

The objective is to build a simple platform to upload and view files:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images


### Resources

Read or watch:

- [Node JS getting started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Process API doc](https://nodejs.org/api/process.html)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://nodemon.io/)
- [MongoDB](https://docs.mongodb.com/)
- [Bull](https://optimalbits.github.io/bull/)
- [Image thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)

### Learning Objectives


- how to create an API with Express
- how to authenticate a user
- how to store data in MongoDB
- how to store temporary data in Redis
- how to set up and use a background worker

### Requirements

- Editor: Visual Studio Code
- All files will be interpreted/compiled on Ubuntu 18.04 LTS using node (version 12.x.x)
- All files should end with a new line


Here are the tasks and corresponding files with links to the repository:

### Tasks

1. **Redis utils**
   - File: `utils/redis.js`
   - [Link to file](https://github.com/Reliccode/alx-files_manager/blob/main/utils/redis.js)

2. **MongoDB utils**
   - File: `utils/db.js`
   - [Link to file](https://github.com/Reliccode/alx-files_manager/blob/main/utils/db.js)

3. **First API**
   - File: `server.js`
   - [Link to file](https://github.com/Reliccode/alx-files_manager/blob/main/server.js)

4. **Create a new user**
   - File: `routes/users.js`
   - [Link to file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/users.js)

5. **Authenticate a user**
   - Files:
     - `routes/index.js`
     - `controllers/AuthController.js`
   - [Link to routes file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/index.js)
   - [Link to controller file](https://github.com/Reliccode/alx-files_manager/blob/main/controllers/AuthController.js)

6. **First file**
   - Files:
     - `routes/files.js`
     - `controllers/FilesController.js`
   - [Link to routes file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/files.js)
   - [Link to controller file](https://github.com/Reliccode/alx-files_manager/blob/main/controllers/FilesController.js)

7. **Get and list file**
   - Files:
     - `routes/files.js`
     - `controllers/FilesController.js`
   - [Link to routes file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/files.js)
   - [Link to controller file](https://github.com/Reliccode/alx-files_manager/blob/main/controllers/FilesController.js)

8. **File publish/unpublish**
   - Files:
     - `routes/files.js`
     - `controllers/FilesController.js`
   - [Link to routes file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/files.js)
   - [Link to controller file](https://github.com/Reliccode/alx-files_manager/blob/main/controllers/FilesController.js)

9. **File data**
   - Files:
     - `routes/files.js`
     - `controllers/FilesController.js`
   - [Link to routes file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/files.js)
   - [Link to controller file](https://github.com/Reliccode/alx-files_manager/blob/main/controllers/FilesController.js)

10. **Image Thumbnails**
    - Files:
      - `routes/files.js`
      - `controllers/FilesController.js`
      - `worker.js`
    - [Link to routes file](https://github.com/Reliccode/alx-files_manager/blob/main/routes/files.js)
    - [Link to controller file](https://github.com/Reliccode/alx-files_manager/blob/main/controllers/FilesController.js)
    - [Link to worker file](https://github.com/Reliccode/alx-files_manager/blob/main/worker.js)

This structure should help navigate the repository and locate specific files related to each task.

## Project Structure

- `utils/`: Contains utility classes for Redis and MongoDB.
- `routes/`: Contains route definitions.
- `controllers/`: Contains controller logic for handling requests.
- `worker.js`: Worker script for processing background tasks.
- `package.json`: Configuration file for Node.js dependencies.
- `.eslintrc.js`: ESLint configuration file.
- `babel.config.js`: Babel configuration file.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Reliccode/alx-files_manager.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
npm start
```

### Usage

The API endpoints can be accessed using tools like curl or Postman.

For example, to authenticate a user:

```bash
curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE="
```

### Author

[Naniwet Maritim](https://github.com/Reliccode