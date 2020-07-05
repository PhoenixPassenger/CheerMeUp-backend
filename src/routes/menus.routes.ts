/* eslint-disable no-shadow */
import { Router } from 'express';
import CreateMenuService from '../services/Menu/CreateMenuService';

const menuRouter = Router();

menuRouter.post('/', async (request, response) => {
  const { store_id } = request.body;
  const createMenuService = new CreateMenuService();

  const menu = await createMenuService.execute({ store_id });

  return response.json(menu);
});

menuRouter.delete('/', async (request, response) => {
  return response.json();
});

export default menuRouter;
