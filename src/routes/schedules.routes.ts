/* eslint-disable no-shadow */
import { Router } from 'express';
import CreateScheduleService from '../services/Schedule/CreateScheduleService';
import ReadScheduleService from '../services/Schedule/ReadScheduleService';

const scheduleRouter = Router();

scheduleRouter.post('/', async (request, response) => {
  const { store_id } = request.body;
  const createScheduleService = new CreateScheduleService();

  const schedule = await createScheduleService.execute({ store_id });

  return response.json(schedule);
});

scheduleRouter.get('/:store_id', async (request, response) => {
  const { store_id } = request.body;
  const readScheduleService = new ReadScheduleService();

  const schedule = readScheduleService.execute({ store_id });
  return response.json(schedule);
});

export default scheduleRouter;
