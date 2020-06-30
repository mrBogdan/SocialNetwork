const MongooseError = require('mongoose').Error;

export default async (ctx: any, next: any) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof MongooseError) {
      ctx.throw(400, 'Bad request');
    } else {
      ctx.throw(e);
    }
  }
}
