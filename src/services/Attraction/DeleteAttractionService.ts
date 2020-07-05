import { getRepository } from 'typeorm';
import Attraction from '../../models/Attraction';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteAttractionService {
  public async execute({ id }: Request): Promise<Attraction> {
    const attractionRepository = getRepository(Attraction);

    const checkAttractionExists = await attractionRepository.findOne({
      where: { id },
    });

    if (!checkAttractionExists) {
      throw new AppError('This attraction does not exist.');
    }

    const attraction = await attractionRepository.remove(checkAttractionExists);

    await attractionRepository.save(attraction);
    return attraction;
  }
}

export default DeleteAttractionService;
