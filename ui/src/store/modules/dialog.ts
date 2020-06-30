import DialogService from '@/services/DialogService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import { AxiosResponse } from 'axios';

const dialogService = new DialogService(AUTH_HTTP_CLIENT());

const state = {
  dialogList: {
    list: [],
    count: 0,
  },
  currentDialog: {},
};
const mutations = {
  setDialogs(state: any, dialogList: any) {
    state.dialogList = dialogList;
  },
  setCurrentDialog(state: any, currentDialog: any) {
    state.currentDialog = currentDialog;
  },
  pushNewMessage(state: any, message: any) {
    state.currentDialog.messages.push(message);
  }
};
const actions = {
  sendMessageByHttp(context: any, { message, userId }: { message: string, userId: string }) {
    return dialogService.create(userId, message);
  },
  getAndSetDialogs(context: any, userId: string) {
    return dialogService.getList()
      .then((res: AxiosResponse) => {
        context.commit('setDialogs', res.data);
        return res;
      });
  },
  getAndSetCurrentDialog(context: any, id: string) {
    return dialogService.getById(id)
      .then((res: AxiosResponse) => {
        context.commit('setCurrentDialog', res.data);
        return res;
      });
  },
  pushNewMessage(context: any, { message } : { message: any} ) {
    context.commit('pushNewMessage', message);
  }
};
const getters = {
  getDialogList(state: any) {
    return state.dialogList;
  },
  getCurrentDialog(state: any) {
    return state.currentDialog;
  },
  getCurrentMessages(state: any) {
    return state.currentDialog.messages;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
