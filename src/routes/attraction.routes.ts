/* eslint-disable no-shadow */
import { Router, request, response } from 'express';
import CreateAttractionService from '../services/Attraction/CreateAttractionService';
import ReadAllAttractionService from '../services/Attraction/ReadAllAttractionService';
import UpdateAttractionService from '../services/Attraction/UpdateAttractionService';
import DeleteAttractionService from '../services/Attraction/DeleteAttractionService';

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

attractionRouter.put('/:id', async (request, response) => {
  const { schedule_id, name, description } = request.body;
  const updateAttractionService = new UpdateAttractionService();

  const attraction = await updateAttractionService.execute({
    schedule_id,
    name,
    description,
  });

  return response.json(attraction);
});

attractionRouter.delete('/:id', async (request, response) => {
  const { id } = request.body;

  const deleteAttractionService = new DeleteAttractionService();

  const attraction = deleteAttractionService.execute({ id });
  return response.json(attraction);
});

attractionRouter.get('/', async (request, response) => {
  const { schedule_id } = request.body;
  const readAllAttractionService = new ReadAllAttractionService();
  const attractions = await readAllAttractionService.execute({ schedule_id });
  return attractions;
});

export default attractionRouter;
