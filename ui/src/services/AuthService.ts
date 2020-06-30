import HTTP_CLIENT from '@/utils';
import { EMPTY, LOCAL_STORAGE_KEYS } from '@/conts';
import { AxiosResponse } from 'axios';

const jwtDecode = require('jwt-decode');

export default class AuthService {
  login(email: string, password: string) {
    return HTTP_CLIENT.post('/auth/login', {
      email,
      password,
    })
      .then((res: AxiosResponse) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.token);
        return res;
      });
  }

  logout() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, EMPTY);
  }

  register(userProfile: any) {
    return HTTP_CLIENT.post('/auth/register', {
      ...userProfile,
    });
  }

  refresh_token() {
  }

  static isSignedIn() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return accessToken && !AuthService.isAccessTokenExpired(AuthService.parseJwtToken(accessToken));
  }

  static getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || '';
  }

  static isAccessTokenExpired(parsedJwtToken: any) {
    const now = Date.now() / 1000;
    return parsedJwtToken.exp < now;
  }

  static parseJwtToken(accessToken: string) {
    return jwtDecode(accessToken);
  }

  static parseCurrentToken() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || '';
    if (!token) {
      return;
    }

    return AuthService.parseJwtToken(token);
  }
}
