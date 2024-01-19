import express from 'express';
import './dB.js';
import cors from 'cors';

import apiRouter from './src/api/router.js';

const server = express();
const { PORT } = process.env;

server.use(express.json());
server.use(cors({ origin: true }));
server.use(apiRouter);
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
