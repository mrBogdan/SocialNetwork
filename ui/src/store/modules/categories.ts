import CategoryService from '@/services/CategoryService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import { AxiosResponse } from 'axios';

const categoryService = new CategoryService(AUTH_HTTP_CLIENT());

const state = {
  categoryList: {
    count: 0,
    list: []
  }
};
const mutations = {
  setCategoryList(state: any, categoryList: any) {
    state.categoryList = categoryList;
  }
};
const actions = {
  pullCategoryList(context: any) {
    return categoryService.getList()
      .then((r: AxiosResponse) => {
        context.commit('setCategoryList', r.data);
        return r;
      })
  }
};
const getters = {
  getCategoryList(state: any) {
    return state.categoryList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
