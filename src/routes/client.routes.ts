import { Router } from 'express';
import { hash } from 'bcryptjs';

import CreateClientService from '../services/Client/CreateClientService';

const clientRouter = Router();

clientRouter.post('/', async (request, response) => {
  const { name, email, password, phone_number, birthdate } = request.body;

  const createClientService = new CreateClientService();

  const hashedPassword = await hash(password, 8);

  const client = await createClientService.execute({
    name,
    email,
    password: hashedPassword,
    phone_number,
    birthdate,
  });

  delete client.password;

  return response.json(client);
});

export default clientRouter;
