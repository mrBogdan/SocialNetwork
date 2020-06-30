import { Context, Next } from 'koa';
import { errorLog } from '../utils';

export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    errorLog(e);
    ctx.status = e.status || 500;
    ctx.body ={
      error: e.message || 'Internal server error',
    }
  }
}
