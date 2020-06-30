import ConversationService from './service';
import { errorLog } from '../../../modules/utils';

export default class ConversationController {
  constructor(private conversationService: ConversationService) {
  }

  create(ctx: any) {
    const user = ctx.state.user._id;
    const { participant, message } = ctx.request.body;

    return this.conversationService.findOne({ $or: [{ user1: user, user2: participant }, { user1: participant, user2: user }]})
      .then((dialog: any) => {
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
      .catch(errorLog);
  }

  list(ctx: any) {
    const userId = ctx.state.user._id;
    return this.conversationService.getList(userId)
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }

  getById(ctx: any) {
    const conversationId = ctx.params.id;
    return this.conversationService.getById(conversationId)
      .then((res: any) => ctx.body = res)
      .catch(errorLog);
  }
}
