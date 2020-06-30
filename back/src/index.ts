import * as env from 'dotenv';
import * as Koa from 'koa';
import handlers from './modules/handlers';
import api from './api/v1';
import { connect } from './modules';
import models from './models';
import socketInit from './socket';

import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

env.config();
const config = require('../config/app.js');
const SocketServer = require('socket.io');

const SSL_PATH = '../ssl-keys';
const sslOptions = {
  key: fs.readFileSync(path.resolve(SSL_PATH + '/private.key')),
  cert: fs.readFileSync(path.resolve(SSL_PATH + '/certificate.crt')),
  ca: fs.readFileSync(path.resolve(SSL_PATH + '/ca_bundle.crt')),
}

const app = new Koa();
const router = api(models, config);
const httpServer = http.createServer(app.callback());
const httpsServer = https.createServer(sslOptions, app.callback());
// @ts-ignore
const ioHttp = new SocketServer(httpServer);
const ioHttps = new SocketServer(httpsServer);

socketInit(config, models, ioHttp);
socketInit(config, models, ioHttps);
handlers.forEach((h: any) => app.use(h));
connect();
app.use(router.routes());
app.use(router.allowedMethods());

httpServer.listen(config.port, () => console.log(`Started on: ${config.port}`));
httpsServer.listen(config.sslPort, () => console.log(`Started on: ${config.sslPort}`));
