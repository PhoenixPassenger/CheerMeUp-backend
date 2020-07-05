import { getRepository } from 'typeorm';
import Rating from '../../models/Rating';

import AppError from '../../errors/AppError';

interface Request {
  score: number;
  comment: string;
  id: string;
}

class UpdateRatingService {
  public async execute({ score, comment, id }: Request): Promise<Rating> {
    const ratingRepository = getRepository(Rating);

    const checkRatingExists = await ratingRepository.findOne({
      where: { id },
    });

    if (!checkRatingExists) {
      throw new AppError('This ratign does not exist.');
    }

    checkRatingExists.score = score;
    checkRatingExists.comment = comment;

    await ratingRepository.save(checkRatingExists);
    return checkRatingExists;
  }
}

export default UpdateRatingService;
