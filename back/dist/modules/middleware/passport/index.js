"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
exports.default = passport.authenticate('jwt', { session: false });
