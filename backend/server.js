import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { corsConfig } from './config/cors.js';
import { wsHandler } from './websocket/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import skillRoutes from './routes/skills.js';
import matchRoutes from './routes/matches.js';
import messageRoutes from './routes/messages.js';
import proposalRoutes from './routes/proposals.js';
import { errorHandler } from './middleware/error.js';

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });

app.use(cors(corsConfig));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/proposals', proposalRoutes);

app.use(errorHandler);

wss.on('connection', (ws, req) => wsHandler(ws, req, wss));

connectDB().then(() => {
  server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    console.log(`WebSocket server at ws://localhost:${config.PORT}/ws`);
  });
});
