"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class ConversationService extends core_1.BaseService {
    constructor(conversationModel) {
        super(conversationModel);
    }
    addMessage(conversationId, sender, message) {
        return this.model.findOneAndUpdate({ _id: conversationId }, {
            $push: {
                messages: {
                    sender,
                    body: message,
                },
            },
        }, {
            new: true,
        })
            .populate({
            path: 'user1 user2 messages.sender',
            model: 'users'
        });
    }
    getList(user) {
        return this.model.find({
            $or: [
                {
                    user1: user,
                },
                {
                    user2: user
                },
            ],
        })
            .populate({
            path: 'user1 user2 messages.sender',
            model: 'users'
        })
            .then((dialogs) => {
            return {
                count: dialogs.length,
                list: dialogs,
            };
        });
    }
    getById(id) {
        return this.model.findById(id)
            .populate({
            path: 'user1 user2 messages.sender',
            model: 'users'
        });
    }
}
exports.default = ConversationService;
