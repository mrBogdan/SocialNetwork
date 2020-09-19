"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class RelationController {
    constructor(relationService) {
        this.relationService = relationService;
    }
    async addToFriends(ctx) {
        const { subscriber } = ctx.request.body;
        const source = ctx.state.user._id;
        await this.relationService.create({
            source: subscriber,
            subscriber: source,
        });
        ctx.status = 201;
    }
    async cancelFriendRequest(ctx) {
        const { subscriber } = ctx.request.body;
        const source = ctx.state.user._id;
        await this.relationService.findOneAndDelete({
            subscriber, source,
        });
        ctx.status = 200;
    }
    async sendFriendRequest(ctx) {
        const { source } = ctx.request.body;
        const subscriber = ctx.state.user._id;
        const checkRelation = await this.relationService.checkRelations(source, subscriber);
        if (checkRelation) {
            ctx.throw(400, 'You have added to friends the user');
        }
        await this.relationService.create({
            source,
            subscriber,
        });
        ctx.status = 201;
    }
    async getList(ctx) {
        ctx.body = await this.relationService.getList(ctx.query);
    }
    async deleteOne(ctx) {
        const { _id } = ctx.params;
        const subscriber = ctx.state.user._id;
        await this.relationService.findOneAndDelete({ _id, subscriber });
        ctx.body = {
            message: 'Relation is destroyed',
        };
    }
    checkUsersRelation(ctx) {
        const { source } = ctx.request.body;
        const subscriber = ctx.state.user._id;
        return this.relationService.checkUserRelations(source, subscriber)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    getNewRelationRequest(ctx) {
        const userId = ctx.state.user._id;
        return this.relationService.getNewRelationRequest(userId)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    getNewRelationRequestCount(ctx) {
        const userId = ctx.state.user._id;
        return this.relationService.getNewRelationRequestCount(userId)
            .then((count) => ctx.body = { count })
            .catch(utils_1.errorLog);
    }
}
exports.default = RelationController;
