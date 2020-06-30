import SearchService from '@/services/SearchService';
import { AxiosResponse } from 'axios';

const state = {
  searchList: {
    count: 0,
    list: [],
  }
};
const mutations = {
  setSearchList(state: any, searchList: any) {
    state.searchList = searchList;
  }
};
const actions = {
  search(context: any, query: string) {
    return SearchService.createInstance()
      .search({ q: query })
      .then((res: AxiosResponse) => {
        context.commit('setSearchList', res.data);
        return res;
      })
  }
};
const getters = {
  getSearchList(state: any) {
    return state.searchList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
