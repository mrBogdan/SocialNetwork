"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    wall: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
            },
            created_date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    comments: [
        {
            body: {
                type: String,
                required: true,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
            },
            created_date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    created_date: {
        type: Date,
        default: Date.now,
    },
});
const userPopulateField = 'user comments.user wall.user';
postSchema.post('save', async (doc) => {
    await doc.populate(userPopulateField).execPopulate();
});
function populateFields() {
    this.populate(userPopulateField);
}
postSchema.pre('find', populateFields);
postSchema.pre('findOne', populateFields);
postSchema.pre('findOneAndUpdate', populateFields);
postSchema.pre('deleteOne', populateFields);
exports.default = mongoose.model('posts', postSchema);
