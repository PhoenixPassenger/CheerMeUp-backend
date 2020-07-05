import { Router, request, response } from 'express';

import CreateMenuItemService from '../services/CreateMenuItemService';

const menuItemRouter = Router();

menuItemRouter.post('/menuitem', async (request, response) => {
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
