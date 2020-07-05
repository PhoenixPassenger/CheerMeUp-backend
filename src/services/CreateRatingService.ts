import { getRepository } from 'typeorm';
import Rating from '../models/Rating';

import AppError from '../errors/AppError';

interface Request {
  score: number;
  comment: string;
  client_id: string;
  store_id: string;
}

class CreateRatingService {
  public async execute({
    score,
    comment,
    client_id,
    store_id,
  }: Request): Promise<Rating> {
    const ratingRepository = getRepository(Rating);

    const checkRatingExists = await ratingRepository.findOne({
      where: { client_id, store_id },
    });

    if (checkRatingExists) {
      throw new AppError('This user alredy rated this store.');
    }

    const rating = ratingRepository.create({
      score,
      comment,
      client_id,
      store_id,
    });

    await ratingRepository.save(rating);
    return rating;
  }
}

export default CreateRatingService;
