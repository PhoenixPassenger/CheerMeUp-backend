/* eslint-disable no-shadow */
import { Router, response } from 'express';
import CreateMenuService from '../services/Menu/CreateMenuService';
import DeleteMenuService from '../services/Menu/DeleteMenuService';
import ReadMenuService from '../services/Menu/ReadMenuService';

const menuRouter = Router();

menuRouter.post('/', async (request, response) => {
  const { store_id } = request.body;
  const createMenuService = new CreateMenuService();

  const menu = await createMenuService.execute({ store_id });

  return response.json(menu);
});

/*
menuRouter.delete('/', async (request, response) => {
  return response.json();
});
*/

menuRouter.get('/', async (request, response) => {
  const { store_id } = request.body;

  const readMenuService = new ReadMenuService();

  const menu = await readMenuService.execute({ store_id });

  return response.json(menu);
});

export default menuRouter;
