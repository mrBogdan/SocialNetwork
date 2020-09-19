"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const passport = require("koa-passport");
exports.default = (likesController) => {
    const router = new Router({
        prefix: '/likes/:postId',
    });
    router.post('/', passport.authenticate('jwt', { session: false }), likesController.like.bind(likesController));
    router.delete('/:likeId', passport.authenticate('jwt', { session: false }), likesController.unlike.bind(likesController));
    return router.routes();
};
