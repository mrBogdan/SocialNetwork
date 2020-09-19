"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Post_1 = require("./Post");
const Relation_1 = require("./Relation");
const Conversation_1 = require("./Conversation");
const Product_1 = require("./Product");
const Order_1 = require("./Order");
const Category_1 = require("./Category");
exports.default = {
    User: User_1.default,
    Post: Post_1.default,
    Order: Order_1.default,
    Product: Product_1.default,
    Category: Category_1.default,
    Relation: Relation_1.default,
    Conversation: Conversation_1.default,
};
