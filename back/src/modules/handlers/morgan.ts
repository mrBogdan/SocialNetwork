import * as morgan from 'koa-morgan';

export default morgan(':method :url :status :res[content-length] - :response-time ms');
