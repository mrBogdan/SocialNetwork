import { USER_RELATIONS } from '@/utils/index';

export default class RelationHelper {
  static isFriend(relationStatus: number) {
    return relationStatus === USER_RELATIONS.FRIENDS
  }

  static isSentFriendRequest(relationStatus: number) {
    return relationStatus === USER_RELATIONS.FRIEND_REQUEST
  }

  static isRequestedFriendsInYou(relationStatus: number) {
    return relationStatus === USER_RELATIONS.REQUESTED_IN_YOU;
  }

  static isNothing(relationStatus: number) {
    return relationStatus === USER_RELATIONS.NOTHING;
  }
}
