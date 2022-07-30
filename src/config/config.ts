import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI ?? '';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

export const config = {
  mongo: {
    url: MONGO_URI
  },
  server: {
    port: SERVER_PORT
  }
};
