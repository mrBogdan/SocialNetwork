import ProductService, { Raw } from '@/services/ProductService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import { AxiosResponse } from 'axios';

const productService = new ProductService(AUTH_HTTP_CLIENT());

const state = {
  currentProduct: {},
  productOwnerList: {
    count: 0,
    list: [],
  },
  productList: {
    count: 0,
    list: [],
  }
};

const mutations = {
  setCurrentProduct(state: any, currentProduct: any) {
    state.currentProduct = currentProduct;
  },
  setProductOwnerList(state: any, productOwnerList: any) {
    state.productOwnerList = productOwnerList;
  },
  setProductList(state: any, productList: any) {
    state.productList = productList;
  }
};
const actions = {
  pullProductList(context: any, query: any) {
    return productService.getList(query)
      .then((res: AxiosResponse) => {
        context.commit('setProductList', res.data);
        return res;
      });
  },
  pullProductById(context: any, id: string) {
    return productService.getById(id)
      .then((res: AxiosResponse) => {
        context.commit('setCurrentProduct', res.data);
        return res;
      })
  },
  pullProductListByProductOwner(context: any, product_owner: string) {
    return productService.getList({
      product_owner,
    })
      .then((r: AxiosResponse) => {
        context.commit('setProductOwnerList', r.data);
        return r;
      });
  },
  updateProduct(context: any, { id, raw }: { id: string, raw: Raw }) {
    return productService.update(id, raw)
      .then((res: any) => {
        return res;
      });
  },
  createProduct(context: any, raw: Raw) {
    return productService.create(raw)
      .then((res: any) => {
        return res;
      });
  },
  remove(context: any, id: string) {
    return productService.remove(id);
  }
};
const getters = {
  getCurrentProduct(state: any) {
    return state.currentProduct
  },
  getProductList(state: any) {
    return state.productList;
  },
  getProductOwnerProductList(state: any) {
    return state.productOwnerList;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
