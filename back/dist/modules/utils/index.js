"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = exports.debug = exports.upsertOptions = void 0;
const appRole_1 = require("./appRole");
function upsertOptions() {
    return {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
    };
}
exports.upsertOptions = upsertOptions;
const ERRORS = {
    PASSWORD_E: 'Email or password are incorrect',
    NOT_FOUND: 'Not found',
};
exports.default = {
    ERRORS,
    VALIDATE: (ctx, item) => {
        if (!item) {
            ctx.throw(404, ERRORS.NOT_FOUND);
        }
        return item;
    },
    ...appRole_1.default,
    DEFAULT_AVATAR_URL: '/uploads/default.svg',
};
function debug(v) {
    console.log({
        v,
        t: typeof v,
    });
}
exports.debug = debug;
function errorLog(err) {
    console.error(err);
}
exports.errorLog = errorLog;
