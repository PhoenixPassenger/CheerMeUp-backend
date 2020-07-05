/* eslint-disable no-shadow */
import { Router } from 'express';

import CreateRecommendationService from '../services/Recommendation/CreateRecommendationService';

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

export default recommendationRouter;
