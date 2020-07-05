import { getRepository } from 'typeorm';
import Client from '../../models/Client';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  birthdate: Date;
  id: string;
}

class UpdateClientService {
  public async execute({
    name,
    email,
    password,
    phone_number,
    birthdate,
    id,
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

    const checkClientExists = await clientRepository.findOne({
      where: { id },
    });

    if (!checkClientExists) {
      throw new AppError('This client does not exist.');
    }

    checkClientExists.name = name;
    checkClientExists.email = email;
    checkClientExists.password = password;
    checkClientExists.phone_number = phone_number;
    checkClientExists.birthdate = birthdate;

    await clientRepository.save(checkClientExists);
    return checkClientExists;
  }
}

export default UpdateClientService;
