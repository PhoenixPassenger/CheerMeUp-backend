import { getRepository } from 'typeorm';
import Schedule from '../../models/Schedule';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeleteScheduleService {
  public async execute({ id }: Request): Promise<Schedule> {
    const scheduleRepository = getRepository(Schedule);
    const checkScheduleExists = await scheduleRepository.findOne({
      where: { id },
    });

    if (!checkScheduleExists) {
      throw new AppError('Schedule does not exists.');
    }

    const schedule = checkScheduleExists;
    await scheduleRepository.remove(schedule);
    return schedule;
  }
}
export default DeleteScheduleService;
