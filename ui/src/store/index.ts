import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthed: false,
    currency: 'грн',
    editorText: '',
  },
  mutations: {
    login(state: any) {
      state.isAuthed = true;
    },
    logout(state: any) {
      state.isAuthed = false;
    },
    setEditorText(state: any, text: string) {
      state.editorText = text;
    }
  },
  getters: {
    isAuthed(state: any) {
      return state.isAuthed;
    },
    getCurrency(state: any) {
      return state.currency;
    },
    getEditorText(state: any) {
      return state.editorText;
    }
  },
  modules,
});
