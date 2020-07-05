import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import storeRouter from './store.routes';
import scheduleRouter from './schedules.routes';
import attractionRouter from './attraction.routes';
import menuRouter from './menus.routes';
import clientRouter from './client.routes';
import ratingRouter from './rating.routes';
import recommendationRouter from './recommendation.routes';
import menuItemRouter from './menuItem.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/store', storeRouter);
routes.use('/schedule', scheduleRouter);
routes.use('/attractions', attractionRouter);
routes.use('/menu', menuRouter);
routes.use('/client', clientRouter);
routes.use('/rating', ratingRouter);
routes.use('/recommendation', recommendationRouter);
routes.use('/menuitem', menuItemRouter);

export default routes;
