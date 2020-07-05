import { getRepository } from 'typeorm';
import Menu from '../models/Menu';

import AppError from '../errors/AppError';

interface Request {
  store_id: string;
}

class CreateMenuService {
  public async execute({ store_id }: Request): Promise<Menu> {
    const menuRepository = getRepository(Menu);
    const checkMenuExists = await menuRepository.findOne({
      where: { store_id },
    });

    if (checkMenuExists) {
      throw new AppError('Schedule already registered.');
    }

    const menu = menuRepository.create({
      store_id,
    });
    await menuRepository.save(menu);
    return menu;
  }
}
export default CreateMenuService;
