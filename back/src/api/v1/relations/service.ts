import { BaseService } from '../../../core';
import { USER_RELATIONS } from '../../../modules/utils/user_relations';
import { debug } from '../../../modules/utils';
import { Document } from 'mongoose';

type FriendsStatus = {
  userFriends: User[],
  newFriendRequestsToUser: User[],
  userFriendRequest: User[]
}
type Relation = any;
type User = any;
type NotResolvedRelation = {
  user: User;
  relationCode: number;
};
type RelationModel = any;

export default class RelationService extends BaseService {

  constructor(relationModel: RelationModel) {
    super(relationModel);
  }

  checkRelations(source: string, subscriber: string) {
    return this.model.findOne({ source, subscriber });
  }

  checkUserRelations(source: string, subscriber: string) {
    return Promise.all([
      this.model.findOne({ source, subscriber }),
      this.model.findOne({ source: subscriber, subscriber: source }),
    ])
      .then(([firstRelation, secondRelation]) => {
        if (firstRelation && secondRelation) {
          return USER_RELATIONS.FRIENDS;
        }

        if (firstRelation) {
          return USER_RELATIONS.FRIEND_REQUEST;
        }

        if (secondRelation) {
          return USER_RELATIONS.REQUESTED_IN_YOU;
        }

        return USER_RELATIONS.NOTHING;
      });
  }

  async getNewRelationRequest(userId: string) {
    const relations: any = this.model.find({
      $or: [
        {
          source: userId,
        },
        {
          subscriber: userId,
        },
      ],
    });
    return relations.exec()
      .then(prepareRelations)
      .then(iterate(userId));
  }

  async getNewRelationRequestCount(userId: string) {
    const relations = await this.getNewRelationRequest(userId);
    return relations.newFriendRequestsToUser.length;
  }
}

function iterate(userId: string) {
  return (items: Relation[]) => {
    const result: FriendsStatus = {
      userFriends: [],
      newFriendRequestsToUser: [],
      userFriendRequest: [],
    };
    const used = [];
    let index = 0;

    used.push(items[index]);

    while (index < items.length) {
      const curr = items[index];

      if (used.includes(curr)) {
        ++ index;
        continue;
      }

      const relation = findRelation(curr, items);

      if (relation) {
        result.userFriends.push(getFriendFromRelation(userId, relation));
        used.push(relation);
      } else {
        used.push(curr);
        const NOT_RESOLVED_RELATION = getSubscriber(userId, curr);

        if (NOT_RESOLVED_RELATION.relationCode === USER_RELATIONS.REQUESTED_IN_YOU) {
          result.newFriendRequestsToUser.push(NOT_RESOLVED_RELATION.user);
        } else if (NOT_RESOLVED_RELATION.relationCode === USER_RELATIONS.FRIEND_REQUEST) {
          result.userFriendRequest.push(NOT_RESOLVED_RELATION.user);
        }
      }
      ++ index;
    }
    return result;
  }
}

function getFriendFromRelation(currentUserId: string, relation: Relation): string {
  return pluckId(relation.subscriber) == currentUserId ? relation.source : relation.subscriber;
}

function getSubscriber(currentUserId: string, relation: Relation): NotResolvedRelation {
  return pluckId(relation.source) == currentUserId
    ? { relationCode: USER_RELATIONS.REQUESTED_IN_YOU, user: relation.subscriber }
    : { relationCode: USER_RELATIONS.FRIEND_REQUEST, user: relation.source };
}

function findRelation(item: any, items: any[]) {
  return items.find((el: any) => {

    if (item === el) {
      return false;
    }

    return pluckId(el.source) === pluckId(item.subscriber) && pluckId(el.subscriber) === pluckId(item.source);
  });
}

function pluckId(value: any) {
  return value._id.toString();
}

function prepareRelations(relations: any) {
  return relations.map((el: any) => {
    const tmp = el.toObject();
    delete tmp.source.password;
    delete tmp.subscriber.password;

    return tmp;
  })
}
