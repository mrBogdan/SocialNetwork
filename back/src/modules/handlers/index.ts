import passportHandler from './passport';
import errorHandler from './error';
import bodyParser from './bodyParser';
import morgan from './morgan';
import cors from './cors';
import koaStatic from './koaStatic';
import catchMongooseError from './catchMongooseError';

export default [
  passportHandler,
  errorHandler,
  catchMongooseError,
  bodyParser,
  koaStatic,
  morgan,
  cors,
];
