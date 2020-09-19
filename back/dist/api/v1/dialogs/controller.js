"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../modules/utils");
class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    create(ctx) {
        const user = ctx.state.user._id;
        const { participant, message } = ctx.request.body;
        return this.conversationService.findOne({ $or: [{ user1: user, user2: participant }, { user1: participant, user2: user }] })
            .then((dialog) => {
            if (!dialog) {
                return this.conversationService.create({
                    user1: user,
                    user2: participant,
                    messages: [
                        {
                            sender: user,
                            body: message,
                        },
                    ],
                });
            }
            return this.conversationService.addMessage(dialog._id, user, message);
        })
            .then(() => ctx.status = 201)
            .catch(utils_1.errorLog);
    }
    list(ctx) {
        const userId = ctx.state.user._id;
        return this.conversationService.getList(userId)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
    getById(ctx) {
        const conversationId = ctx.params.id;
        return this.conversationService.getById(conversationId)
            .then((res) => ctx.body = res)
            .catch(utils_1.errorLog);
    }
}
exports.default = ConversationController;
