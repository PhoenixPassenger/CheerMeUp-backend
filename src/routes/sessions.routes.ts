/* eslint-disable no-shadow */
import { Router } from 'express';
import AuthenticateStoreService from '../services/Store/AuthenticateStoreService';

const sessionsRouter = Router();

sessionsRouter.post('/store', async (request, response) => {
  const { email, password } = request.body;
  const authentication = new AuthenticateStoreService();

  const { store, token } = await authentication.execute({ email, password });
  delete store.password;

  return response.json({ store, token });
});

export default sessionsRouter;
