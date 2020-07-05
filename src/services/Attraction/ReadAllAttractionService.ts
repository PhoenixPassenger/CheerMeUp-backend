import { getRepository } from 'typeorm';
import Attraction from '../../models/Attraction';

import AppError from '../../errors/AppError';

interface Request {
  schedule_id: string;
}

class ReadAllAttractionService {
  public async execute({ schedule_id }: Request): Promise<Attraction[]> {
    const attractionRepository = getRepository(Attraction);

    const checkAttractionExists = await attractionRepository.find({
      where: { schedule_id },
    });

    if (!checkAttractionExists) {
      throw new AppError('This attraction does not exist.');
    }

    return checkAttractionExists;
  }
}

export default ReadAllAttractionService;
