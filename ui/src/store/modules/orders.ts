import OrderService from '@/services/OrderService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import { AxiosResponse } from 'axios';

const orderService = new OrderService(AUTH_HTTP_CLIENT());

const state = {
  userOrderList: {
    count: 0,
    list: [],
  },
  productOwnerList: {
    count: 0,
    list: [],
  }
};
const mutations = {
  setUserOrderList(state: any, list: any) {
    state.userOrderList = list;
  },
  setProductOwnerList(state: any, list: any) {
    state.productOwnerList = list;
  }
};
const actions = {
  pullUserOrders(context: any) {
    return orderService.userOrders()
      .then((r: AxiosResponse) => {
        context.commit('setUserOrderList', r.data);
        return r;
      })
  },
  orderProduct(context: any, orderParams: any) {
    return orderService.create(orderParams);
  },
  pullProductOwnerOrders(context: any) {
    return orderService.getProductOwnerOrders()
      .then((r: AxiosResponse) => {
        context.commit('setProductOwnerList', r.data);
        return r;
      })
  },
  updateStatusOrder(context: any, { orderId, status }: { orderId: string, status: number }) {
    return orderService.updateStatusOrder(orderId, status)
      .then((res: AxiosResponse) => {
        return context.dispatch('pullProductOwnerOrders');;
      });
  }
};
const getters = {
  getUserOrders(state: any) {
    return state.userOrderList;
  },
  getProductOwnerList(state: any) {
    return state.productOwnerList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
