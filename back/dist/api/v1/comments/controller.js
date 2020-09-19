"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(ctx) {
        const { postId } = ctx.params;
        const post = await this.commentsService.getById(postId);
        utils_1.default.VALIDATE(ctx, post);
        const { body } = ctx.request.body;
        const { _id: userId } = ctx.state.user;
        ctx.body = await this.commentsService.addNewComment(post, body, userId);
    }
    async deleteById(ctx) {
        const { commentId, postId } = ctx.params;
        const post = await this.commentsService.getById(postId);
        utils_1.default.VALIDATE(ctx, post);
        const commentIndex = findCommentIndex(post.comments, commentId);
        if (commentIndex < 0) {
            ctx.throw(404, 'Comment not found');
        }
        ctx.body = await this.commentsService.deleteComment(post, commentIndex);
    }
}
exports.default = CommentsController;
function findCommentIndex(comments, commentId) {
    return comments.findIndex((el) => el._id.toString() === commentId);
}
