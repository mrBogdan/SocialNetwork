"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const passport = require("koa-passport");
exports.default = (commentsController) => {
    const router = new Router({
        prefix: '/comments/:postId',
    });
    router.post('/', passport.authenticate('jwt', { session: false }), commentsController.create.bind(commentsController));
    router.delete('/:commentId', passport.authenticate('jwt', { session: false }), commentsController.deleteById.bind(commentsController));
    return router.routes();
};
