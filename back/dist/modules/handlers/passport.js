"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
const User_1 = require("../../models/User");
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config/app.js');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
};
passport.use(new Strategy(options, async (payload, done) => {
    const user = await User_1.default.findById(payload.id);
    if (user) {
        done(null, user);
    }
    else {
        done(null, false);
    }
}));
exports.default = passport.initialize();
