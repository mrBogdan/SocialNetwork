"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const passport = require("koa-passport");
exports.default = (postsController) => {
    const router = new Router({
        prefix: '/posts'
    });
    router.get('/', postsController.getList.bind(postsController));
    router.get('/:id', postsController.getById.bind(postsController));
    router.post('/', passport.authenticate('jwt', { session: false }), postsController.create.bind(postsController));
    router.delete('/:id', passport.authenticate('jwt', { session: false }), postsController.deleteById.bind(postsController));
    router.put('/', passport.authenticate('jwt', { session: false }), postsController.updateById.bind(postsController));
    return router.routes();
};
