"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        refs: 'users',
        required: true,
    },
    user2: {
        type: Schema.Types.ObjectId,
        refs: 'users',
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    messages: [{
            sender: {
                type: Schema.Types.ObjectId,
                refs: 'users',
                required: true,
            },
            body: {
                type: String,
                default: '',
            },
            created_date: {
                type: Date,
                default: Date.now,
            }
        }],
    created_date: {
        type: Date,
        default: Date.now,
    }
});
exports.default = mongoose.model('conversations', conversationSchema);
