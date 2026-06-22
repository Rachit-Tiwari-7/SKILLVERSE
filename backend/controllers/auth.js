import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/User.js';

function signToken(id) {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user._id);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res) {
  res.json({ user: req.user });
}
