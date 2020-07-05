import { getRepository } from 'typeorm';
import Recommendation from '../../models/Recommendation';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class ReadRecommendationService {
  public async execute({ id }: Request): Promise<Recommendation> {
    const recommendationRepository = getRepository(Recommendation);

    const checkRecommendationExists = await recommendationRepository.findOne({
      where: { id },
    });

    if (!checkRecommendationExists) {
      throw new AppError('This recommendation does not exist.');
    }

    return checkRecommendationExists;
  }
}

export default ReadRecommendationService;
