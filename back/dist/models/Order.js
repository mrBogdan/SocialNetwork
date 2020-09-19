"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ordersModel = new Schema({
    created_date: {
        type: Date,
        default: Date.now,
    },
    products: [{
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        }],
    product_owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    }
});
exports.default = mongoose.model('orders', ordersModel);
