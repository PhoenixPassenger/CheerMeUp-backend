import { getRepository } from 'typeorm';
import Client from '../models/Client';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  birthdate: Date;
}

export default class CreateClientService {
  public async execute({
    name,
    email,
    password,
    phone_number,
    birthdate,
  }: Request): Promise<Client> {
    const clientRepository = getRepository(Client);

    function validateEmail(): boolean {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      return re.test(String(email).toLowerCase());
    }

    const checkValidEmail = validateEmail();

    const checkUserExists = await clientRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    if (!checkValidEmail) {
      throw new AppError('Invalid email address.');
    }

    const client = clientRepository.create({
      name,
      email,
      password,
      phone_number,
      birthdate,
    });
    await clientRepository.save(client);
    return client;
  }
}
