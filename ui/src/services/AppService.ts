export class AppService {
  static init($store: any, token: string) {
    $store.commit('login');
    $store.dispatch('friends/getAndSetNewFriendInviteCount');
    return $store.dispatch('user/pullAndSetCurrentUser', token);
  }
}
