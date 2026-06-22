import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/User.js';

const clients = new Map();

export function wsHandler(ws, req, wss) {
  let userId = null;

  ws.on('message', async (raw) => {
    try {
      const data = JSON.parse(raw);

      switch (data.type) {
        case 'auth': {
          const decoded = jwt.verify(data.token, config.JWT_SECRET);
          userId = decoded.id;
          await User.findByIdAndUpdate(userId, { isOnline: true });
          clients.set(userId, ws);
          broadcast({ type: 'user:online', userId });
          break;
        }

        case 'message:send': {
          if (!userId) return;
          const { matchId, content, to } = data;
          const recipientWs = clients.get(to);
          if (recipientWs?.readyState === 1) {
            recipientWs.send(JSON.stringify({
              type: 'message:new',
              matchId,
              sender: userId,
              content,
              timestamp: new Date().toISOString(),
            }));
          }
          break;
        }

        case 'typing': {
          if (!userId) return;
          const { to, matchId } = data;
          const recipientWs = clients.get(to);
          if (recipientWs?.readyState === 1) {
            recipientWs.send(JSON.stringify({ type: 'typing', matchId, userId }));
          }
          break;
        }

        case 'match:update': {
          if (!userId) return;
          const { matchId, status, participants } = data;
          for (const uid of participants) {
            const uws = clients.get(uid);
            if (uws?.readyState === 1 && uid !== userId) {
              uws.send(JSON.stringify({ type: 'match:update', matchId, status }));
            }
          }
          break;
        }

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong' }));
          break;
      }
    } catch {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message' }));
    }
  });

  ws.on('close', async () => {
    if (userId) {
      clients.delete(userId);
      await User.findByIdAndUpdate(userId, { isOnline: false });
      broadcast({ type: 'user:offline', userId });
    }
  });

  ws.on('error', () => {
    if (userId) clients.delete(userId);
  });
}

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const ws of clients.values()) {
    if (ws.readyState === 1) ws.send(msg);
  }
}
