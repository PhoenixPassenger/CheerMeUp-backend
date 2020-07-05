import { getRepository } from 'typeorm';
import MenuItem from '../../models/MenuItem';

import AppError from '../../errors/AppError';

interface Request {
  menu_id: string;
}

class ReadAllMenuItemService {
  public async execute({ menu_id }: Request): Promise<MenuItem[]> {
    const menuItemRepository = getRepository(MenuItem);

    const checkMenuItemExists = await menuItemRepository.find({
      where: { menu_id },
    });

    if (!checkMenuItemExists) {
      throw new AppError('This menu is empty.');
    }

    return checkMenuItemExists;
  }
}

export default ReadAllMenuItemService;
