/* eslint-disable no-shadow */
import { Router, request, response } from 'express';

import CreateRecommendationService from '../services/CreateRecommendationService';

const recommendationRouter = Router();

recommendationRouter.post('/recommendation', async (request, response) => {
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
