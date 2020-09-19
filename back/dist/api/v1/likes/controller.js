"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class LikesController {
    constructor(likesService) {
        this.likesService = likesService;
    }
    async like(ctx) {
        const { postId } = ctx.params;
        const post = await this.likesService.getById(postId);
        utils_1.default.VALIDATE(ctx, post);
        const user = ctx.state.user._id;
        if (findUserLike(post.likes, user)) {
            ctx.throw(400, 'User already liked this post');
        }
        ctx.body = await this.likesService.like(post, user);
    }
    async unlike(ctx) {
        const { likeId, postId } = ctx.params;
        const post = await this.likesService.getById(postId);
        utils_1.default.VALIDATE(ctx, post);
        const likeIndex = findLikeIndex(post.likes, likeId);
        ctx.body = await this.likesService.unlike(post, likeIndex);
    }
}
exports.default = LikesController;
function findUserLike(likes, userId) {
    return likes.find((el) => el.user.toString() === userId);
}
function findLikeIndex(likes, likeId) {
    return likes.findIndex((el) => el._id.toString() === likeId);
}
