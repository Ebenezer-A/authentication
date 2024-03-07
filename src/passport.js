import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "./model.js";
import bcrypt from 'bcryptjs'

passport.serializeUser((user, done)=>{
  done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  try {
    const authUser = await User.findOne({_id: _id});
    if(!authUser) throw new Error("User not found!!")
    done(null, authUser)
  } catch (err) {
    done(err, null)
  }
})

export default passport.use(new LocalStrategy({
  usernameField: 'email',
},
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) { throw new Error("User not found") }
      if (!bcrypt.compareSync(password, user.password)) { throw new Error("Password doesn't match") }
      return done(null, user);
    } catch (err) {
      done(err, null)
    }
  })
);
