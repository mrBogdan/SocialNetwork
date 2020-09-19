import * as http from 'http';
import socketInit from '../../socket';
import models from '../../models';
import Application = require('koa');

export default (config: any, app: Application, SocketServer: any) => {
  const httpServer = http.createServer(app.callback());
  const ioHttp = new SocketServer(httpServer);
  socketInit(config, models, ioHttp);
  httpServer.listen(config.port, () => console.log(`Started on: ${ config.port }`));
}
