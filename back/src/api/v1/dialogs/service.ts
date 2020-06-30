import { BaseService } from '../../../core';

type ConversationModel = any;

export default class ConversationService extends BaseService {
  constructor(conversationModel: ConversationModel) {
    super(conversationModel);
  }

  addMessage(conversationId: string, sender: string, message: string) {
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

  getList(user: string) {
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
      .then((dialogs: any) => {
        return {
          count: dialogs.length,
          list: dialogs,
        };
      });
  }

  getById(id: string): any {
    return this.model.findById(id)
      .populate({
        path: 'user1 user2 messages.sender',
        model: 'users'
      });
  }
}
