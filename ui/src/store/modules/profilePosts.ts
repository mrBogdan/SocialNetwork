import PostService from '@/services/PostService';
import { AUTH_HTTP_CLIENT } from '@/utils';
import { AxiosResponse } from 'axios';

const postService = new PostService(AUTH_HTTP_CLIENT());

const state = {
  posts: [],
  count: 0,
};
const mutations = {
  setPosts(state: any, posts: any[]) {
    state.posts = posts;
  },
  setPostsCount(state: any, count: number) {
    state.count = count;
  },
  replacePost(state: any, post: any) {
    const idx = state.posts.findIndex((p: any) => post._id === p._id);
    state.posts.splice(idx, 1, post);
  },
  removePostById(state: any, postId: string) {
    const idx = state.posts.findIndex((p: any) => postId === p._id);
    state.posts.splice(idx, 1);
  },
};
const actions = {
  create(context: any,{ wall, body }: { wall: string, body: string }) {
    return postService.createPost(body, wall)
      .then(() => context.dispatch('getPostList', wall));
  },
  getPostById(context: any, postId: string) {
    return postService.getPostById(postId)
      .then((r: AxiosResponse) => r.data);
  },
  getPostList(context: any, wall: string) {
    return postService
      .getUserPostList(wall)
      .then((r: AxiosResponse) => {
        context.commit('setPosts', r.data.list);
        context.commit('setPostsCount', r.data.count);
        return r.data;
      });
  },
  addComment(context: any, { postId, body }: { postId: string, body: string }) {
    return postService.addComment(postId, body)
      .then(() => context.dispatch('getPostById', postId))
      .then((r: any) => context.commit('replacePost', r));
  },
  removeComment(context: any, { postId, commentId }: { postId: string, commentId: string }) {
    return postService.removeComment(postId, commentId)
      .then(() => context.dispatch('getPostById', postId))
      .then((r: any) => context.commit('replacePost', r));
  },
  removePost(context: any, postId: string) {
    return postService.deleteOne(postId)
      .then(() => context.commit('removePostById', postId));
  },
};
const getters = {
  getPostList(state: any) {
    return state.posts;
  },
  getPostCount(state: any) {
    return state.count;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
