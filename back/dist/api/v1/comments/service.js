"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class CommentsService extends core_1.BaseService {
    constructor(postModel) {
        super(postModel);
    }
    addNewComment(post, body, user) {
        post.comments.unshift({ body, user });
        return post.save();
    }
    deleteComment(post, commentIndex) {
        post.comments.splice(commentIndex, 1);
        return post.save();
    }
}
exports.default = CommentsService;
