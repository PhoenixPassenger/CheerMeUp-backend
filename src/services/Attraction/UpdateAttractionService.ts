import { getRepository } from 'typeorm';
import Attraction from '../../models/Attraction';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  description: string;
  id: string;
}

class UpdateAttractionService {
  public async execute({
    name,
    description,
    id,
  }: Request): Promise<Attraction> {
    const attractionRepository = getRepository(Attraction);

    const checkAttractionExists = await attractionRepository.findOne({
      where: { id },
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
