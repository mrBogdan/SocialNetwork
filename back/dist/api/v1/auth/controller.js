"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {
    constructor(userService, config) {
        this.userService = userService;
        this.config = config;
    }
    async login(ctx) {
        const { email, password } = ctx.request.body;
        const user = await this.userService.findOne({ email });
        if (!user) {
            ctx.throw(400, utils_1.default.ERRORS.PASSWORD_E);
        }
        const isMatch = await bc.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                last_name: user.last_name,
                app_role: user.app_role,
            };
            const token = jwt.sign(payload, this.config.secret, { expiresIn: 3600 * 24 });
            ctx.body = { token: `Bearer ${token}` };
        }
        else {
            ctx.throw(400, utils_1.default.ERRORS.PASSWORD_E);
        }
    }
    async register(ctx) {
        const { name, last_name, email, password } = ctx.request.body;
        const user = await this.userService.findOne({ email });
        if (user) {
            ctx.throw(400, 'Email already exists');
        }
        const salt = await bc.genSalt(10);
        const hash = await bc.hash(password, salt);
        await this.userService.create({ email, last_name, name, password: hash });
        ctx.status = 201;
    }
    async list(ctx) {
        ctx.body = await this.userService.getList(ctx.query);
    }
}
exports.default = AuthController;
