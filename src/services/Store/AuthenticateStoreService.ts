import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import Store from '../models/Store';

interface Request {
  email: string;
  password: string;
}

class AuthenticateStoreService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ store: Store; token: string }> {
    const storeRepository = getRepository(Store);

    const store = await storeRepository.findOne({
      where: { email },
    });

    if (!store) {
      throw new AppError('Email/password incorrect.', 401);
    }

    const passwordMatch = await compare(password, store.password);

    if (!passwordMatch) {
      throw new AppError('Email/password incorrect.', 401);
    }

    // Auth complete

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: store.id,
      expiresIn,
    });

    return {
      store,
      token,
    };
  }
}
export default AuthenticateStoreService;
