import { getRepository } from 'typeorm';
import Menu from '../models/Menu';
import MenuItem from '../models/MenuItem';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  price: number;
  description: string;
  menu_id: string;
}

class CreateMenuItemService {
  public async execute({
    name,
    price,
    description,
    menu_id,
  }: Request): Promise<MenuItem> {
    const menuItemRepository = getRepository(MenuItem);

    const checkMenuItemExists = await menuItemRepository.findOne({
      where: { name },
    });

    if (checkMenuItemExists) {
      throw new AppError('MenuItem already exists.');
    }

    const menuItem = menuItemRepository.create({
      name,
      price,
      description,
      menu_id,
    });
    await menuItemRepository.save(menuItem);
    return menuItem;
  }
}

export default CreateMenuItemService;
