import passport from 'passport';
import googlestrategy from './google-strategy.js';
import localStrategy from './local-strategy.js';

export default passport.use(googlestrategy, localStrategy);
