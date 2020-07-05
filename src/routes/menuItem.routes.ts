import { Router } from 'express';

import CreateMenuItemService from '../services/MenuItem/CreateMenuItemService';

const menuItemRouter = Router();

menuItemRouter.post('/', async (request, response) => {
  const { name, price, description, menu_id } = request.body;

  const createMenuItemService = new CreateMenuItemService();

  const menuItem = await createMenuItemService.execute({
    name,
    price,
    description,
    menu_id,
  });

  return response.json(menuItem);
});

export default menuItemRouter;
