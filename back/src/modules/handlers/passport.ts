import * as passport from 'koa-passport';
import User from '../../models/User';

const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config/app.js');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

passport.use(new Strategy(options, async (payload: any, done: any) => {
  const user = await User.findById(payload.id);
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

export default passport.initialize();
