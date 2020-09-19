import APP_ROLE from './appRole';

export function upsertOptions() {
  return {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  }
}

const ERRORS = {
    PASSWORD_E: 'Email or password are incorrect',
    NOT_FOUND: 'Not found',
};

export default {
  ERRORS,
  VALIDATE: (ctx: any, item: any) => {
    if (!item) {
      ctx.throw(404, ERRORS.NOT_FOUND);
    }
    return item;
  },
  ...APP_ROLE,
  DEFAULT_AVATAR_URL: '/uploads/default.svg',
}

export function debug(v: any) {
  console.log({
    v,
    t: typeof v,
  });
}

export function errorLog(err: Error) {
  console.error(err);
}
