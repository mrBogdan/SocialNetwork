"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
const userRelations_1 = require("../../../modules/utils/userRelations");
class RelationService extends core_1.BaseService {
    constructor(relationModel) {
        super(relationModel);
    }
    checkRelations(source, subscriber) {
        return this.model.findOne({ source, subscriber });
    }
    checkUserRelations(source, subscriber) {
        return Promise.all([
            this.model.findOne({ source, subscriber }),
            this.model.findOne({ source: subscriber, subscriber: source }),
        ])
            .then(([firstRelation, secondRelation]) => {
            if (firstRelation && secondRelation) {
                return userRelations_1.UserRelations.FRIENDS;
            }
            if (firstRelation) {
                return userRelations_1.UserRelations.FRIEND_REQUEST;
            }
            if (secondRelation) {
                return userRelations_1.UserRelations.REQUESTED_IN_YOU;
            }
            return userRelations_1.UserRelations.NOTHING;
        });
    }
    async getNewRelationRequest(userId) {
        const relations = this.model.find({
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
    async getNewRelationRequestCount(userId) {
        const relations = await this.getNewRelationRequest(userId);
        return relations.newFriendRequestsToUser.length;
    }
}
exports.default = RelationService;
function iterate(userId) {
    return (items) => {
        const result = {
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
                ++index;
                continue;
            }
            const relation = findRelation(curr, items);
            if (relation) {
                result.userFriends.push(getFriendFromRelation(userId, relation));
                used.push(relation);
            }
            else {
                used.push(curr);
                const NOT_RESOLVED_RELATION = getSubscriber(userId, curr);
                if (NOT_RESOLVED_RELATION.relationCode === userRelations_1.UserRelations.REQUESTED_IN_YOU) {
                    result.newFriendRequestsToUser.push(NOT_RESOLVED_RELATION.user);
                }
                else if (NOT_RESOLVED_RELATION.relationCode === userRelations_1.UserRelations.FRIEND_REQUEST) {
                    result.userFriendRequest.push(NOT_RESOLVED_RELATION.user);
                }
            }
            ++index;
        }
        return result;
    };
}
function getFriendFromRelation(currentUserId, relation) {
    return pluckId(relation.subscriber) == currentUserId ? relation.source : relation.subscriber;
}
function getSubscriber(currentUserId, relation) {
    return pluckId(relation.source) == currentUserId
        ? { relationCode: userRelations_1.UserRelations.REQUESTED_IN_YOU, user: relation.subscriber }
        : { relationCode: userRelations_1.UserRelations.FRIEND_REQUEST, user: relation.source };
}
function findRelation(item, items) {
    return items.find((el) => {
        if (item === el) {
            return false;
        }
        return pluckId(el.source) === pluckId(item.subscriber) && pluckId(el.subscriber) === pluckId(item.source);
    });
}
function pluckId(value) {
    return value._id.toString();
}
function prepareRelations(relations) {
    return relations.map((el) => {
        const tmp = el.toObject();
        delete tmp.source.password;
        delete tmp.subscriber.password;
        return tmp;
    });
}
