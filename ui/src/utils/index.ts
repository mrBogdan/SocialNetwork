import axios from 'axios';
import { API_URL, BEARER } from '@/conts';
import AuthService from '@/services/AuthService';

const HTTP_CLIENT = axios.create({
  baseURL: API_URL + '/api/v1',
});

export function AUTH_HTTP_CLIENT() {
  return axios.create({
    baseURL: API_URL + '/api/v1',
    headers: {
      Authorization: prepareBearerToken(AuthService.getAccessToken()),
    }
  });
}

function prepareBearerToken(token: string) {
  if (token.includes(BEARER)) {
    return token;
  }
  return BEARER + ' ' + token;
}

export function concatWithAPI_URL(path: string) {
  if (path && path.length && path[0] !== '/') {
    return API_URL + '/' + path;
  }
  return API_URL + path;
}

export const USER_RELATIONS = {
  FRIENDS: 10,
  FRIEND_REQUEST: 11,
  REQUESTED_IN_YOU: 12,
  NOTHING: 322,
}

export function errorRedirectHandler(status: number) {
  switch (status) {
    case 404: {
      return { name: 'NotFound' };
    }
    case 403: {
      return { name: 'Forbidden' };
    }
    default: {
      return { name: 'NotFound' };
    }
  }
}

export default HTTP_CLIENT;

export function concatQueryParams(q: any) {
  return Object.keys(q)
    .reduce((acc, curr) => {
      acc.push(`${curr}=${q[curr]}`);
      return acc;
    }, [] as any)
    .join('&');
}
