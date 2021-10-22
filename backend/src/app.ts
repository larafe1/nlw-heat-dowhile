import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import config from '@/config';
import router from '@/routes';
import { AppCallbackRequestQuery } from '@/types';

const app = express();
const serverHttp = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/github', (_, res) => {
  res.redirect(
    config.githubOAuthUrl + `/authorize?client_id=${config.githubClientId}`
  );
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query as AppCallbackRequestQuery;

  return res.json(code);
});

const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log(`User has been connected to the socket ${socket.id}`);
});

export { serverHttp, io };
