const state = {
  isLoading: false,
};
const mutations = {
  startLoading(state: any) {
    state.isLoading = true;
  },
  finishLoading(state: any) {
    state.isLoading = false;
  }
};
const actions = {};
const getters = {
  isLoading(state: any) {
    return state.isLoading;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
