const APP_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  GUEST: 'guest',
}

function appRoleValidation(currentUserRole: string, requiredRole: string) {
  return currentUserRole !== requiredRole;
}

export default {
  APP_ROLES,
  appRoleValidation,
}
