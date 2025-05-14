import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

export const registerAuth = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // If user not found
  if (!user) return res.status(404).json({ error: 'User not found' });

  // If invalid password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
