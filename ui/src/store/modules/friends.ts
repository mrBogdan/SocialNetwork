import { AUTH_HTTP_CLIENT } from '@/utils';
import RelationService from '@/services/RelationService';
import { AxiosResponse } from 'axios';

const relationService = new RelationService(AUTH_HTTP_CLIENT());

type User = any;
type Friends = {
  userFriends: User[],
  newFriendRequestsToUser: User[],
  userFriendRequest: User[]
};

const state = {
  countNewFriends: 0,
  friends: {},
};
const mutations = {
  setCountNewFriends(state: any, count: number) {
    state.countNewFriends = count;
  },
  setFriends(state: any, friends: Friends) {
    state.friends = friends;
  }
};
const actions = {
  getAndSetNewFriendInviteCount(context: any) {
    return relationService.getNewFriendInviteCount()
      .then((r: AxiosResponse) => {
        context.commit('setCountNewFriends', r.data.count);
        return r;
      });
  },
  getAndSetFriends(context: any) {
    return relationService.getNewFriendInvite()
      .then((r: AxiosResponse) => {
        context.commit('setFriends', r.data);
        return r;
      });
  }

};
const getters = {
  getCountNewFriends(state: any) {
    return state.countNewFriends;
  },
  getFriends(state: any): Friends {
    return state.friends;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
