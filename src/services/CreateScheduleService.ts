import { getRepository } from 'typeorm';
import Schedule from '../models/Schedule';

import AppError from '../errors/AppError';

interface Request {
  store_id: string;
}

class CreateScheduleService {
  public async execute({ store_id } : Request): Promise<Schedule> {
    const scheduleRepository = getRepository(Schedule);
    const checkWordExists = await scheduleRepository.findOne({
      where: { store_id },
    });

    if (checkWordExists) {
      throw new AppError('Schedule already registered.');
    }

    const schedule = scheduleRepository.create({
      store_id,
    });
    await scheduleRepository.save(schedule);
    return schedule;
  }
}
export default CreateScheduleService;
