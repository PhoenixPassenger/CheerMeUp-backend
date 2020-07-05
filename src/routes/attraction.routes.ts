/* eslint-disable no-shadow */
import { Router } from 'express';
import CreateAttractionService from '../services/Attraction/CreateAttractionService';

const attractionRouter = Router();

attractionRouter.post('/', async (request, response) => {
  const { schedule_id, name, description } = request.body;
  const createAttractionService = new CreateAttractionService();

  const attraction = await createAttractionService.execute({
    schedule_id,
    name,
    description,
  });

  return response.json(attraction);
});

export default attractionRouter;
