const API_KEY = '/relations';

export default class RelationService {
  constructor(private authHttpClient: any) {
  }

  sendFriendRequest(source: string) {
    return this.authHttpClient.post(API_KEY, {
      source,
    });
  }

  cancelFriendRequest(subscriber: string) {
    return this.authHttpClient.post(API_KEY + '/cancel-friend-request', {
      subscriber,
    });
  }

  addFriend(subscriber: string) {
    return this.authHttpClient.post(API_KEY + '/add-friend', {
      subscriber,
    });
  }

  getUserRelation(source: string) {
    return this.authHttpClient.post(API_KEY + '/check-user-relations', {
      source,
    })
  }

  getNewFriendInviteCount() {
    return this.authHttpClient.get(API_KEY + '/get-new-friend-requests-count');
  }

  getNewFriendInvite() {
    return this.authHttpClient.get(API_KEY + '/get-new-friend-requests');
  }

}
