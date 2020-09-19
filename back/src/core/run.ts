import * as Koa from 'koa';
import api from '../api/v1';
import models from '../models';
import handlers from '../modules/handlers';
import { connect } from '../modules/db';
import AppFactory from './app.factory';

const SocketServer = require('socket.io');

export default (config: any) => {
  const app = new Koa();
  const router = api(models, config);
  handlers.forEach((h: any) => app.use(h));
  connect();

  app.use(router.routes());
  app.use(router.allowedMethods());

  const appFactory = new AppFactory(config, app, SocketServer);
  return appFactory.createApp(config.PROTOCOL);
}
