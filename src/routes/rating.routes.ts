import { Router } from 'express';

import CreateRatingService from '../services/Rating/CreateRatingService';

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

export default ratingRouter;
