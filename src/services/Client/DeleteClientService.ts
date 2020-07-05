import { getRepository } from 'typeorm';
import Client from '../../models/Client';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteClientService {
  public async execute({ id }: Request): Promise<Client> {
    const clientRepository = getRepository(Client);

    const checkClientExists = await clientRepository.findOne({
      where: { id },
    });

    if (!checkClientExists) {
      throw new AppError('This client does not exist.');
    }

    const client = await clientRepository.remove(checkClientExists);

    await clientRepository.save(client);
    return client;
  }
}

export default DeleteClientService;
