import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from './library/logger';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const app = express();

/** mongo connection*/
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logger.info('connected to Mongodb');
    startServer();
  })
  .catch((error) => {
    Logger.error(error);
  });

/** start server fn */
const startServer = () => {
  app.use((req, res, next) => {
    Logger.info(`incoming -> method: [${req.method}] -url [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      Logger.info(`incoming -> method: [${req.method}] -url [${req.url}] - IP: [${req.socket.remoteAddress}] - status [${req.statusCode}]`);
    });

    next();
  });

  /** middlewares */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /**APIS RULES */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'origin, x-Requested-With, Content-Type, Authorization, Accepter');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */

  app.use('/author', authorRoutes);
  app.use('/books', bookRoutes);

  /**checks */
  app.get('/ping', (req, res) => {
    res.status(200).json({
      message: 'pong'
    });
  });

  /**Errors  */
  app.use((req, res, next) => {
    const error = new Error('not found');

    Logger.error(error);

    return res.status(400).json({
      message: error.message
    });
  });

  http.createServer(app).listen(config.server.port, () => Logger.info(`server is up and running`));
};
