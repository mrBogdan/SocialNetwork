import * as SocketServer from 'socket.io';
import { Socket } from 'socket.io';
import ConversationService from '../api/v1/dialogs/service';

const jwt = require('jsonwebtoken');

type User = {
  conversationId: string,
  userId: string,
  socketId: string,
};

type SocketPacket = {
  token: string;
  conversationId: string;
  data: any;
}

export default function init(config: any, models: any, io: any) {
  io.on('connection', (socket: Socket) => {
    const conversationService = new ConversationService(models.Conversation);

    socket.on('joinDialog', ({ token, conversationId } : SocketPacket) => {
      const payload = jwt.decode(token.replace('Bearer ', ''));
      socket.join(conversationId);
      const joinedFriend = {
        conversationId,
        userId: payload.id,
        socketId: socket.id,
      };
      io.to(conversationId).emit('updateUsers', joinedFriend);
    })

    socket.on('message', ({ token, conversationId, data }: SocketPacket, cb: any) => {
      const payload = jwt.decode(token.replace('Bearer ', ''));

      conversationService.addMessage(conversationId, payload.id, data)
        .then((res: any) => {
          io.to(conversationId).emit('newMessage', getLastUserMessage(res.messages, payload.id));
        });
    });

    socket.on('disconnect', () => {
    });
  });
}

function getLastUserMessage(messages: any[], userId: string) {
  return messages.reverse().find((message: any) => message.sender._id.toString() === userId);
}
