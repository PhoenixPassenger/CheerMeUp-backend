import { Router } from 'express';

import CreateMenuItemService from '../services/MenuItem/CreateMenuItemService';
import UpdateMenuItemService from '../services/MenuItem/UpdateMenuItemService';
import ReadAllMenuItemService from '../services/MenuItem/ReadAllMenuItemService';
import DeleteMenuItemService from '../services/MenuItem/DeleteMenuItemService';

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

menuItemRouter.put('/:id', async (request, response) => {
  const { name, price, description, id } = request.body;
  const updateMenuItemService = new UpdateMenuItemService();
  const menuItem = await updateMenuItemService.execute({
    name,
    price,
    description,
    id,
  });

  return response.json(menuItem);
});

menuItemRouter.delete('/:id', async (request, response) => {
  const { id } = request.body;
  const deleteMenuItemService = new DeleteMenuItemService();
  const menuItem = await deleteMenuItemService.execute({ id });
  return response.json(menuItem);
});

menuItemRouter.get('/:menu_id', async (request, response) => {
  const { menu_id } = request.body;
  const readAllMenuItemService = new ReadAllMenuItemService();
  const menuItems = await readAllMenuItemService.execute({ menu_id });
  return response.json(menuItems);
});

export default menuItemRouter;
