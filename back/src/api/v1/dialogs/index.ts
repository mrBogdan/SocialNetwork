import Router from './router';
import ConversationController from './controller';
import ConversationService from './service';

export default (models: any) => Router(new ConversationController(new ConversationService(models.Conversation)));
