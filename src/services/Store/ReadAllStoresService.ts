import { getRepository } from 'typeorm';
import Store from '../../models/Store';
import AppError from '../../errors/AppError';

class ReadStoreService {
  public async execute(): Promise<Store[]> {
    const storeRepository = getRepository(Store);

    const checkStoreExists = await storeRepository.find();

    if (!checkStoreExists) {
      throw new AppError('No stores');
    }

    return checkStoreExists;
  }
}

export default ReadStoreService;
