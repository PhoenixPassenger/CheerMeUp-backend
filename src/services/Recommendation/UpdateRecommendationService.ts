import { getRepository } from 'typeorm';
import Recommendation from '../../models/Recommendation';

import AppError from '../../errors/AppError';

interface Request {
  title: string;
  content: string;
  id: string;
}

class CreateRecommendationService {
  public async execute({
    title,
    content,
    id,
  }: Request): Promise<Recommendation> {
    const recommendationRepository = getRepository(Recommendation);

    const checkRecommendationExists = await recommendationRepository.findOne({
      where: { id },
    });

    if (!checkRecommendationExists) {
      throw new AppError('This recommendation does not exists');
    }

    checkRecommendationExists.content = content;
    checkRecommendationExists.title = title;
    await recommendationRepository.save(checkRecommendationExists);
    return checkRecommendationExists;
  }
}

export default CreateRecommendationService;
