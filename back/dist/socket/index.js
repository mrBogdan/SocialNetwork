"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../api/v1/dialogs/service");
const jwt = require('jsonwebtoken');
function init(config, models, io) {
    io.on('connection', (socket) => {
        const conversationService = new service_1.default(models.Conversation);
        socket.on('joinDialog', ({ token, conversationId }) => {
            const payload = jwt.decode(token.replace('Bearer ', ''));
            socket.join(conversationId);
            const joinedFriend = {
                conversationId,
                userId: payload.id,
                socketId: socket.id,
            };
            io.to(conversationId).emit('updateUsers', joinedFriend);
        });
        socket.on('message', ({ token, conversationId, data }, cb) => {
            const payload = jwt.decode(token.replace('Bearer ', ''));
            conversationService.addMessage(conversationId, payload.id, data)
                .then((res) => {
                io.to(conversationId).emit('newMessage', getLastUserMessage(res.messages, payload.id));
            });
        });
        socket.on('disconnect', () => {
        });
    });
}
exports.default = init;
function getLastUserMessage(messages, userId) {
    return messages.reverse().find((message) => message.sender._id.toString() === userId);
}
