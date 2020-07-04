import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import storeRouter from './store.routes';
import scheduleRouter from './schedules.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/store', storeRouter);
routes.use('/schedule', scheduleRouter);

export default routes;
