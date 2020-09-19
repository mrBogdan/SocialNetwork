import { Config } from '../interfaces';
import Application = require('koa');
import http from './app_protocols/http';
import https from './app_protocols/https';
const { PROTOCOLS } = require('../../consts');

export default class AppFactory {
  constructor(private config: Config,  private app: Application, private  SocketServerClass: any) {}

  createApp(protocol: string) {
    switch (protocol) {
      case PROTOCOLS.HTTP: {
        return http(this.config, this.app, this.SocketServerClass);
      }
      case PROTOCOLS.HTTPS: {
        return https(this.config, this.app, this.SocketServerClass);
      }
      default: {
        return http(this.config, this.app, this.SocketServerClass);
      }
    }
  }
}
