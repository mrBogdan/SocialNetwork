"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const modules_1 = require("../../../modules");
exports.default = (relationController) => {
    const router = new Router({
        prefix: '/relations',
    });
    router.post('/', modules_1.passportMiddleware, (ctx) => relationController.sendFriendRequest(ctx));
    router.post('/add-friend', modules_1.passportMiddleware, (ctx) => relationController.addToFriends(ctx));
    router.post('/cancel-friend-request', modules_1.passportMiddleware, (ctx) => relationController.cancelFriendRequest(ctx));
    router.post('/check-user-relations', modules_1.passportMiddleware, (ctx) => relationController.checkUsersRelation(ctx));
    router.delete('/:_id', modules_1.passportMiddleware, (ctx) => relationController.deleteOne(ctx));
    router.get('/', (ctx) => relationController.getList(ctx));
    router.get('/get-new-friend-requests', modules_1.passportMiddleware, (ctx) => relationController.getNewRelationRequest(ctx));
    router.get('/get-new-friend-requests-count', modules_1.passportMiddleware, (ctx) => relationController.getNewRelationRequestCount(ctx));
    return router.routes();
};
