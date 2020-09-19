"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = new Schema({
    name: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    }
});
exports.default = mongoose.model('categories', categories);
