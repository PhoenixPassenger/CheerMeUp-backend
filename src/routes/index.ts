import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import storeRouter from './store.routes';
import scheduleRouter from './schedules.routes';
import attractionRouter from './attraction.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/store', storeRouter);
routes.use('/schedule', scheduleRouter);
routes.use('/attractions', attractionRouter);

export default routes;
