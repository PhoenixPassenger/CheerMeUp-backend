/* eslint-disable no-shadow */
import { Router, request, response } from 'express';
import { hash } from 'bcryptjs';

import CreateStoreService from '../services/CreateStoreService';

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
    number,
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
    number,
    phone_number,
  });

  delete store.password;

  return response.json(store);
});

export default storeRouter;
