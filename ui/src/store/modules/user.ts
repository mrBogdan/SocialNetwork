import AuthService from '@/services/AuthService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import UserService from '@/services/UserService';
import { AxiosResponse } from 'axios';
import { Raw } from '@/services/ProductService';

const userService = new UserService(AUTH_HTTP_CLIENT());

const state = {
  accountOwner: {},
  user: {},
};

const mutations = {
  setAccountOwner(state: any, accountOwner: any) {
    state.accountOwner = accountOwner;
  },
  setUser(state: any, user: any) {
    state.user = user;
  },
};

const actions = {
  pullAndSetCurrentUser(context: any, token: string) {
    const parsedToken = AuthService.parseJwtToken(token);
    return userService.getById(parsedToken.id)
      .then((r: AxiosResponse) => {
        context.commit('setAccountOwner', r.data);
        return r;
      });
  },
  pullAndSetUserById(context: any, id: string) {
    return userService.getById(id)
      .then((r: AxiosResponse) => {
        context.commit('setUser', r.data);
        return r;
      });
  },
  updateProfile(context: any, { id, raw }: { id: string, raw: Raw }) {
    return userService.update(id, raw)
      .then((r: AxiosResponse) => {
        context.commit('setUser', r.data);
        return r;
      });
  },
};

const getters = {
  getAccountOwnerAvatar(state: any) {
    return state.accountOwner.avatar;
  },
  getAccountOwnerId(state: any) {
    return state.accountOwner._id;
  },
  getAccountOwner(state: any) {
    return state.accountOwner;
  },
  getUser(state: any) {
    return state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
