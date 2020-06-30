import Router from './router';
import RelationController from './controller';
import RelationService from './service';

export default (models: any) => Router(new RelationController(new RelationService(models.Relation)));
