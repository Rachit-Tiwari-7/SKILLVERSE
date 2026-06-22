import Match from '../models/Match.js';

export async function getMatches(req, res, next) {
  try {
    const matches = await Match.find({ users: req.user._id })
      .populate('users skills')
      .sort({ matchedAt: -1 });
    res.json({ matches });
  } catch (err) {
    next(err);
  }
}

export async function createMatch(req, res, next) {
  try {
    const { targetUserId, skills } = req.body;
    const match = await Match.create({
      users: [req.user._id, targetUserId],
      skills,
    });
    res.status(201).json({ match });
  } catch (err) {
    next(err);
  }
}

export async function updateMatchStatus(req, res, next) {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });
    match.status = req.body.status;
    await match.save();
    res.json({ match });
  } catch (err) {
    next(err);
  }
}
