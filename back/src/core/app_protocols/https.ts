import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import Application = require('koa');
import socketInit from '../../socket';
import models from '../../models';

export default (config: any, app: Application, SocketServer: any) => {
  const SSL_PATH = '../ssl-keys';
  const sslOptions = {
    key: fs.readFileSync(path.resolve(SSL_PATH + '/private.key')),
    cert: fs.readFileSync(path.resolve(SSL_PATH + '/certificate.crt')),
    ca: fs.readFileSync(path.resolve(SSL_PATH + '/ca_bundle.crt')),
  };

  const httpsServer = https.createServer(sslOptions, app.callback());
  const ioHttps = new SocketServer(httpsServer);

  socketInit(config, models, ioHttps);
  httpsServer.listen(config.sslPort, () => console.log(`Started on: ${config.sslPort}`));
}
