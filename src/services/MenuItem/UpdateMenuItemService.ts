import { getRepository } from 'typeorm';
import MenuItem from '../../models/MenuItem';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  price: number;
  description: string;
  id: string;
}

class UpdateMenuItemService {
  public async execute({
    name,
    price,
    description,
    id,
  }: Request): Promise<MenuItem> {
    const menuItemRepository = getRepository(MenuItem);

    const checkMenuItemExists = await menuItemRepository.findOne({
      where: { id },
    });

    if (!checkMenuItemExists) {
      throw new AppError('This menu item does not exist.');
    }

    checkMenuItemExists.name = name;
    checkMenuItemExists.price = price;
    checkMenuItemExists.description = description;

    await menuItemRepository.save(checkMenuItemExists);
    return checkMenuItemExists;
  }
}

export default UpdateMenuItemService;
