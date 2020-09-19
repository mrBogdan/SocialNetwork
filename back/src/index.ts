import * as env from 'dotenv';
import { run } from './core';

env.config();
const config = require('../config/app.js');

run(config);
