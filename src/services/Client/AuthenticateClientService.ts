import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../../errors/AppError';

import authConfig from '../../config/auth';
import Client from '../../models/Client';

interface Request {
  email: string;
  password: string;
}

class AuthenticateClientService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ client: Client; token: string }> {
    const clientRepository = getRepository(Client);

    const client = await clientRepository.findOne({
      where: { email },
    });

    if (!client) {
      throw new AppError('Email/password incorrect.', 401);
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError('Email/password incorrect.', 401);
    }

    // Auth complete

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: client.id,
      expiresIn,
    });

    return {
      client,
      token,
    };
  }
}
export default AuthenticateClientService;
