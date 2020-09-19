"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const utils_1 = require("../modules/utils");
const privatePath = require('mongoose-private-paths');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: utils_1.default.DEFAULT_AVATAR_URL,
    },
    description: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    app_role: {
        type: String,
        default: utils_1.default.APP_ROLES.USER,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});
userSchema.plugin(privatePath);
exports.default = mongoose.model('users', userSchema);
