import { getRepository } from 'typeorm';
import Attraction from '../../models/Attraction';

import AppError from '../../errors/AppError';

interface Request {
  schedule_id: string;
  name: string;
  description: string;
}

class UpdateAttractionService {
  public async execute({
    schedule_id,
    name,
    description,
  }: Request): Promise<Attraction> {
    const attractionRepository = getRepository(Attraction);

    const checkAttractionExists = await attractionRepository.findOne({
      where: { name },
    });

    if (!checkAttractionExists) {
      throw new AppError('This attraction does not exist.');
    }

    checkAttractionExists.name = name;
    checkAttractionExists.description = description;

    await attractionRepository.save(checkAttractionExists);
    return checkAttractionExists;
  }
}

export default UpdateAttractionService;
