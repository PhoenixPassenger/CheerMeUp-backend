/* eslint-disable no-shadow */
import { Router } from 'express';

import CreateRecommendationService from '../services/Recommendation/CreateRecommendationService';
import ReadRecommendationService from '../services/Recommendation/ReadRecommendationService';
import UpdateRecommendationService from '../services/Recommendation/UpdateRecommendationService';
import DeleteRecommendationService from '../services/Recommendation/DeleteRecommendationService';

const recommendationRouter = Router();

recommendationRouter.post('/', async (request, response) => {
  const { title, content, client_id, store_id } = request.body;

  const createRecommendationService = new CreateRecommendationService();

  const recommendation = await createRecommendationService.execute({
    title,
    content,
    client_id,
    store_id,
  });

  return response.json(recommendation);
});

recommendationRouter.put('/:id', async (request, response) => {
  const { title, content, id } = request.body;
  const updateRecommendationService = new UpdateRecommendationService();
  const recommendation = updateRecommendationService.execute({
    title,
    content,
    id,
  });
  return response.json(recommendation);
});

recommendationRouter.delete('/:id', async (request, response) => {
  const { id } = request.body;
  const deleteRecommendationService = new DeleteRecommendationService();
  const recommendation = await deleteRecommendationService.execute({ id });
  return response.json(recommendation);
});

recommendationRouter.get('/:id', async (request, response) => {
  const { id } = request.body;
  const readRecommendationService = new ReadRecommendationService();
  const recommendation = await readRecommendationService.execute({ id });
  return response.json(recommendation);
});

export default recommendationRouter;
