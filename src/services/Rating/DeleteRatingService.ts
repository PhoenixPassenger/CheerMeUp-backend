import { getRepository } from 'typeorm';
import Rating from '../../models/Rating';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteRatingService {
  public async execute({ id }: Request): Promise<Rating> {
    const ratingRepository = getRepository(Rating);

    const checkRatingExists = await ratingRepository.findOne({
      where: { id },
    });

    if (!checkRatingExists) {
      throw new AppError('This rating does not exist.');
    }

    const rating = await ratingRepository.remove(checkRatingExists);

    await ratingRepository.save(rating);
    return rating;
  }
}

export default DeleteRatingService;
