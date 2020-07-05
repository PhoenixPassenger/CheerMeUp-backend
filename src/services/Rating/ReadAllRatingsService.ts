import { getRepository } from 'typeorm';
import Rating from '../../models/Rating';
import AppError from '../../errors/AppError';

interface Request {
  store_id: string;
}

class ReadAllRatingsService {
  public async execute({ store_id }: Request): Promise<Rating[]> {
    const ratingRepository = getRepository(Rating);

    const checkRatingsExists = await ratingRepository.find({
      where: { store_id },
    });

    if (!checkRatingsExists) {
      throw new AppError('Thies store has no ratings yet');
    }

    return checkRatingsExists;
  }
}

export default ReadAllRatingsService;
