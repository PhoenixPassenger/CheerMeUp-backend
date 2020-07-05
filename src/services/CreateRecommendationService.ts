import { getRepository } from 'typeorm';
import Store from '../models/Store';
import Recommendation from '../models/Recommendation';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  content: string;
  client_id: string;
  store_id: string;
}

class CreateRecommendationService {
  public async execute({
    title,
    content,
    client_id,
    store_id,
  }: Request): Promise<Recommendation> {
    const recommendationRepository = getRepository(Recommendation);

    const checkRecommendationExists = await recommendationRepository.findOne({
      where: { client_id, store_id },
    });

    if (checkRecommendationExists) {
      throw new AppError('This user already sent a recommendation to this store.');
    }

    const recommendation = recommendationRepository.create({
      title,
      content,
      client_id,
      store_id,
    });
    await recommendationRepository.save(recommendation);
    return recommendation;
  }
}

export default CreateRecommendationService;
