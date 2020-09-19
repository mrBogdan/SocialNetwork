"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class PostsService extends core_1.BaseService {
    constructor(postsModel) {
        super(postsModel);
    }
    async updateById(_id, user, body) {
        return this.model.findOneAndUpdate({ _id, user }, { $set: { body } }, { new: true });
    }
}
exports.default = PostsService;
