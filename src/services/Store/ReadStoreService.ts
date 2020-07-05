import { getRepository } from 'typeorm';
import Store from '../../models/Store';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class ReadStoreService {
  public async execute({ id }: Request): Promise<Store> {
    const storeRepository = getRepository(Store);

    const checkStoreExists = await storeRepository.findOne({
      where: { id },
    });

    if (!checkStoreExists) {
      throw new AppError('This store does not exist.');
    }

    return checkStoreExists;
  }
}

export default ReadStoreService;
