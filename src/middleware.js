import jwt from 'jsonwebtoken';
import * as environments from './environments.js';
import { GoogleUser } from './model.js';

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, Token Not found' });
  }

  try {
    const decoded = jwt.verify(token, environments.jwtSecret);
    const user = await GoogleUser.findById(decoded.sub);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}
