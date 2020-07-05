import { getRepository } from 'typeorm';
import MenuItem from '../../models/MenuItem';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteMenuItemService {
  public async execute({ id }: Request): Promise<MenuItem> {
    const menuItemRepository = getRepository(MenuItem);

    const checkMenuItemExists = await menuItemRepository.findOne({
      where: { id },
    });

    if (!checkMenuItemExists) {
      throw new AppError('This MenuItem does not exist.');
    }

    const menuItem = await menuItemRepository.remove(checkMenuItemExists);

    await menuItemRepository.save(menuItem);
    return menuItem;
  }
}

export default DeleteMenuItemService;
