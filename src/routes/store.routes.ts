/* eslint-disable no-shadow */
import { Router } from 'express';
import { hash } from 'bcryptjs';

import CreateStoreService from '../services/Store/CreateStoreService';
import ReadStoreService from '../services/Store/ReadStoreService';
import UpdateStoreService from '../services/Store/UpdateStoreService';
import ReadAllStoresService from '../services/Store/ReadAllStoresService';

const storeRouter = Router();

storeRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
    cnpj,
    uf,
    city,
    neighborhood,
    public_place,
    house_number,
    phone_number,
  } = request.body;

  const createStoreService = new CreateStoreService();

  const hashedPassword = await hash(password, 8);

  const store = await createStoreService.execute({
    name,
    email,
    password: hashedPassword,
    cnpj,
    uf,
    city,
    neighborhood,
    public_place,
    house_number,
    phone_number,
  });

  delete store.password;

  return response.json(store);
});

storeRouter.put('/:id', async (request, response) => {
  const {
    name,
    email,
    password,
    cnpj,
    uf,
    city,
    neighborhood,
    public_place,
    house_number,
    phone_number,
    id,
  } = request.body;

  const hashedPassword = await hash(password, 8);

  const updateStoreService = new UpdateStoreService();
  const store = await updateStoreService.execute({
    name,
    email,
    password: hashedPassword,
    cnpj,
    uf,
    city,
    neighborhood,
    public_place,
    house_number,
    phone_number,
    id,
  });

  delete store.password;

  return response.json(store);
});

storeRouter.get('/:id', async (request, response) => {
  const { id } = request.body;
  const readStoreService = new ReadStoreService();
  const store = readStoreService.execute({ id });
  return response.json(store);
});

storeRouter.get('/', async (request, response) => {
  const readAllStoresServices = new ReadAllStoresService();
  const stores = readAllStoresServices.execute();
  return response.json(stores);
});

export default storeRouter;
