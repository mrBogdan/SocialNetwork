"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APP_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    GUEST: 'guest',
};
function appRoleValidation(currentUserRole, requiredRole) {
    return currentUserRole !== requiredRole;
}
exports.default = {
    APP_ROLES,
    appRoleValidation,
};
