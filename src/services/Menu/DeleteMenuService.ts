import { getRepository } from 'typeorm';
import Menu from '../../models/Menu';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteMenuService {
  public async execute({ id }: Request): Promise<Menu> {
    const menuRepository = getRepository(Menu);

    const checkMenuExists = await menuRepository.findOne({
      where: { id },
    });

    if (!checkMenuExists) {
      throw new AppError('This menu does not exist.');
    }

    const menu = await menuRepository.remove(checkMenuExists);

    await menuRepository.save(menu);
    return menu;
  }
}

export default DeleteMenuService;
