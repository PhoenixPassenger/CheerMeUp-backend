import { getRepository } from 'typeorm';
import Menu from '../../models/Menu';

import AppError from '../../errors/AppError';

interface Request {
  store_id: string;
}

class ReadMenuService {
  public async execute({ store_id }: Request): Promise<Menu> {
    const menuRepository = getRepository(Menu);

    const checkMenuExists = await menuRepository.findOne({
      where: { store_id },
    });

    if (!checkMenuExists) {
      throw new AppError('This menu does not exist.');
    }

    return checkMenuExists;
  }
}

export default ReadMenuService;
