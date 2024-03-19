import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { GoogleUser } from '../model.js';
import * as environments from '../environments.js';
import jwt from 'jsonwebtoken';

export default passport.use(
  new Strategy(
    {
      clientID: environments.clientID,
      clientSecret: environments.clientsecret,
      callbackURL: 'http://localhost:5000/auth/google/redirect',
      scope: ['email', 'profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      let authUser;
      try {
        authUser = await GoogleUser.findOne({ email: profile.emails[0].value });
      } catch (error) {
        return done(error, null);
      }
      try {
        if (!authUser) {
          const newUser = new GoogleUser({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
          });
          const createdUser = await newUser.save();
          const token = jwt.sign(
            { sub: createdUser._id },
            environments.jwtSecret
          );
          return done(null, token);
        }
        const token = jwt.sign({ sub: authUser._id }, environments.jwtSecret);
        return done(null, token);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
