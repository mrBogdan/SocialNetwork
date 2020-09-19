"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("dotenv");
const core_1 = require("./core");
env.config();
const config = require('../config/app.js');
core_1.run(config);
