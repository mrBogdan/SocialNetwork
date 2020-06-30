import * as koaStatic from 'koa-static';

const ROOT = '.';

export default koaStatic(ROOT, {
  hidden: true,
});
