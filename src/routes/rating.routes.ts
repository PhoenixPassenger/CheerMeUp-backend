import { Router } from 'express';

import CreateRatingService from '../services/Rating/CreateRatingService';
import ReadAllRatingsService from '../services/Rating/ReadAllRatingsService';
import UpdateRatingService from '../services/Rating/UpdateRatingService';
import DeleteRatingService from '../services/Rating/DeleteRatingService';

const ratingRouter = Router();

ratingRouter.post('/', async (request, response) => {
  const { score, comment, client_id, store_id } = request.body;

  const createRatingService = new CreateRatingService();
  const rating = await createRatingService.execute({
    score,
    comment,
    client_id,
    store_id,
  });

  return response.json(rating);
});

ratingRouter.put('/:id', async (request, response) => {
  const { score, comment, id } = request.body;

  const updateRatingService = new UpdateRatingService();

  const rating = await updateRatingService.execute({
    score,
    comment,
    id,
  });

  return response.json(rating);
});

ratingRouter.delete('/:id', async (request, response) => {
  const { id } = request.body;

  const deleteRatingService = new DeleteRatingService();

  const rating = await deleteRatingService.execute({ id });

  return response.json(rating);
});

ratingRouter.get('/', async (request, response) => {
  const { store_id } = request.body;
  const readAllRatingsService = new ReadAllRatingsService();
  const ratings = readAllRatingsService.execute({ store_id });
  return response.json(ratings);
});

export default ratingRouter;
