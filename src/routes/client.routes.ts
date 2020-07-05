import { Router } from 'express';
import { hash } from 'bcryptjs';

import CreateClientService from '../services/Client/CreateClientService';
import UpdateClientService from '../services/Client/UpdateClientService';
import DeleteClientService from '../services/Client/DeleteClientService';
import ReadClientService from '../services/Client/ReadClientService';

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

clientRouter.put('/:id', async (request, response) => {
  const { name, email, password, phone_number, birthdate, id } = request.body;

  const updateClientService = new UpdateClientService();

  const hashedPassword = await hash(password, 8);

  const client = await updateClientService.execute({
    name,
    email,
    password: hashedPassword,
    phone_number,
    birthdate,
    id,
  });

  delete client.password;

  return response.json(client);
});

clientRouter.delete('/:id', async (request, response) => {
  const { id } = request.body;

  const deleteClientService = new DeleteClientService();

  const client = await deleteClientService.execute({ id });

  return response.json(client);
});

clientRouter.get('/:id', async (request, response) => {
  const { id } = request.body;
  const readClientService = new ReadClientService();
  const client = await readClientService.execute({ id });
  return response.json(client);
});

export default clientRouter;
