"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class LikesService extends core_1.BaseService {
    constructor(postModel) {
        super(postModel);
    }
    like(post, userId) {
        post.likes.unshift({ user: userId });
        return post.save();
    }
    unlike(post, likeIndex) {
        post.likes.splice(likeIndex, 1);
        return post.save();
    }
}
exports.default = LikesService;
