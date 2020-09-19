"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
const bc = require('bcrypt');
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getList(ctx) {
        ctx.body = await this.userService.getList(ctx.query);
    }
    getById(ctx) {
        return this.userService.getById(ctx.params.id)
            .then((user) => utils_1.default.VALIDATE(ctx, user))
            .then((user) => ctx.body = user)
            .catch(utils_1.errorLog);
    }
    async update(ctx) {
        const _id = ctx.state.user._id;
        const updateParams = ctx.request.body;
        if (ctx.request.file) {
            updateParams.avatar = ctx.request.file.path;
        }
        if (updateParams.password) {
            const salt = await bc.genSalt(10);
            updateParams.password = await bc.hash(updateParams.password, salt);
        }
        return this.userService.findOneAndUpdate({ _id }, updateParams, { new: true })
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
}
exports.default = UserController;
