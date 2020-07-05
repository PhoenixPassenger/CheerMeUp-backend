/* eslint-disable no-shadow */
import { Router } from 'express';
import CreateScheduleService from '../services/Schedule/CreateScheduleService';

const scheduleRouter = Router();

scheduleRouter.post('/', async (request, response) => {
  const { store_id } = request.body;
  const createScheduleService = new CreateScheduleService();

  const schedule = await createScheduleService.execute({ store_id });

  return response.json(schedule);
});

export default scheduleRouter;
