import Message from '../models/Message.js';
import Match from '../models/Match.js';

export async function getMessages(req, res, next) {
  try {
    const { matchId } = req.params;
    const match = await Match.findOne({ _id: matchId, users: req.user._id });
    if (!match) return res.status(403).json({ error: 'Not part of this match' });

    const messages = await Message.find({ match: matchId })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { matchId } = req.params;
    const match = await Match.findOne({ _id: matchId, users: req.user._id });
    if (!match) return res.status(403).json({ error: 'Not part of this match' });

    const message = await Message.create({
      match: matchId,
      sender: req.user._id,
      content: req.body.content,
    });

    const populated = await message.populate('sender', 'name avatar');
    res.status(201).json({ message: populated });
  } catch (err) {
    next(err);
  }
}
