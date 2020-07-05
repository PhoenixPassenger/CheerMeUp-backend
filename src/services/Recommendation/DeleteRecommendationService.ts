import { getRepository } from 'typeorm';
import Recommendation from '../../models/Recommendation';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteRecommendationService {
  public async execute({ id }: Request): Promise<Recommendation> {
    const recommendationRepository = getRepository(Recommendation);

    const checkRecommendationExists = await recommendationRepository.findOne({
      where: { id },
    });

    if (!checkRecommendationExists) {
      throw new AppError('This recommendation does not exist.');
    }

    const recommendation = recommendationRepository.remove(
      checkRecommendationExists,
    );
    return recommendation;
  }
}

export default DeleteRecommendationService;
