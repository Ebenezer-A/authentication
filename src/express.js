import express from "express";
import cookieParser from "cookie-parser";
import session from 'express-session';
import { User } from './model.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import './passport/index.js';
import dotenv from 'dotenv';
import { verifyToken } from './middleware.js';

dotenv.config();
const app = express();

app.use(cookieParser('password'));
app.use(express.json());
app.use(
  session({
    secret: 'passowrd',
    saveUninitialized: false,
    resave: false,
    // visited: true,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// signup using username and password
app.post('/signup', async (req, res) => {
  const {
    body: { name, password, email },
  } = req;

  if (!password || !email || !name) {
    return res.status(403).send({
      msg: 'Field missing',
    });
  }

  const newUser = new User({
    name: name,
    password: bcrypt.hashSync(password),
    email: email,
  });
  try {
    const createdUser = await newUser.save();
    return res.send(createdUser);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// local strategy login
app.post('/login', passport.authenticate('local'), (req, res) => {
  res
    .send({
      msg: 'login successful!!',
    })
    .status(200);
});

app.get('/auth/status', (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// google oauth 2.0
app.get(
  '/auth/google',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.sendStatus(202);
  }
);

app.get(
  '/auth/google/redirect',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = req.user;
    res.cookie('token', token);
    res.sendStatus(200);
  }
);

app.get('/googlejwt', verifyToken, (req, res) => {
  const user = req.user;
  res.send({ user }).status(200);
});


export default app;
