import { getRepository } from 'typeorm';
import Store from '../models/Store';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  uf: string;
  city: string;
  neighborhood: string;
  public_place: string;
  house_number: number;
  phone_number: string;
}

class CreateStoreService {
  public async execute({
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
  }: Request): Promise<Store> {
    const storeRepository = getRepository(Store);

    function validateEmail(): boolean {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      return re.test(String(email).toLowerCase());
    }

    const checkValidEmail = validateEmail();

    const checkUserExists = await storeRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    if (!checkValidEmail) {
      throw new AppError('Invalid email address.');
    }

    const store = storeRepository.create({
      name,
      email,
      password,
      city,
      neighborhood,
      house_number,
      cnpj,
      phone_number,
      public_place,
      uf,
    });
    await storeRepository.save(store);
    return store;
  }
}
export default CreateStoreService;
