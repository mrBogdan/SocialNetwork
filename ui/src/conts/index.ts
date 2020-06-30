export const API_URL = 'http://your-backend-host';

export const EMPTY = '';
export const BEARER = 'Bearer';
export const DEFAULT_FILE_FIELD_NAME = 'package';

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export function getDefaultAvatarUrl() {
  return API_URL + '/uploads/default.svg';
}
