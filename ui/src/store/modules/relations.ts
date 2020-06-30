import RelationService from '@/services/RelationService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import { AxiosResponse } from 'axios';

const relationService = new RelationService(AUTH_HTTP_CLIENT());

const state = {
  relation: '',
};
const mutations = {
  setUserRelation(state: any, relation: string) {
    state.relation = relation;
  }
};
const actions = {
  pullUserRelation(context: any, source: string) {
    return relationService.getUserRelation(source)
      .then((r: AxiosResponse) => {
        context.commit('setUserRelation', r.data);
        return r;
      });
  },
  sendFriendRequest(context: any, source: string) {
    return relationService.sendFriendRequest(source)
      .then((r: AxiosResponse) => r.data);
  },
  addToFriend(context: any, subscriber: string) {
    return relationService.addFriend(subscriber)
      .then((r: AxiosResponse) => r.data);
  },
  cancelFriendRequest(context: any, subscriber: string) {
    return relationService.cancelFriendRequest(subscriber)
      .then((r: AxiosResponse) => {
        return r;
      })
  }
};
const getters = {
  getUserRelation(state: any) {
    return state.relation;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
