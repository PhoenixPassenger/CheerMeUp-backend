import { getRepository } from 'typeorm';
import Attraction from '../../models/Attraction';

import AppError from '../../errors/AppError';

interface Request {
  schedule_id: string;
  name: string;
  description: string;
}

class CreateAttractionService {
  public async execute({
    description,
    name,
    schedule_id,
  }: Request): Promise<Attraction> {
    const attractionRepository = getRepository(Attraction);
    const checkNameExists = await attractionRepository.findOne({
      where: { name },
    });

    if (checkNameExists) {
      throw new AppError('Attraction already registered.');
    }

    const attraction = attractionRepository.create({
      schedule_id,
      description,
      name,
    });
    await attractionRepository.save(attraction);
    return attraction;
  }
}
export default CreateAttractionService;
