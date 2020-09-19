"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose = require("mongoose");
const config = require('../../../config/app');
function connect() {
    mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log('Connected to mongo'))
        .catch((e) => console.error(e));
}
exports.connect = connect;
