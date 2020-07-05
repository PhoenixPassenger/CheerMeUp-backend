import { getRepository } from 'typeorm';
import Schedule from '../../models/Schedule';

import AppError from '../../errors/AppError';

interface Request {
  store_id: string;
}

class ReadScheduleService {
  public async execute({ store_id }: Request): Promise<Schedule> {
    const scheduleRepository = getRepository(Schedule);

    const checkScheduleExists = await scheduleRepository.findOne({
      where: { store_id },
    });

    if (!checkScheduleExists) {
      throw new AppError('This store does not have a schedule yet.');
    }

    return checkScheduleExists;
  }
}

export default ReadScheduleService;
