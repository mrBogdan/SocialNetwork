const state = {
  text: '',
  isHide: true,
  timeout: 2000,
};

const mutations = {
  show(state: any, text: string) {
    state.text = text;
    state.isHide = false;
  },
  hide(state: any) {
    state.isHide = true;
  },
};

const actions = {
  show(context: any, message: string) {
    context.commit('show', message);
  },
  hide(context: any) {
    context.commit('hide');
  },
  error(context: any, message?: string) {
    const msg = message || 'Щось пішло не так, спробуйте пізніше';
    context.commit('show', msg);
  }
};

const getters = {
  getText(state: any) {
    return state.text;
  },
  isShown(state: any) {
    return !state.isHide;
  },
  timeout(state: any) {
    return state.timeout;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
