import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Schedule from './Schedule';

@Entity('attractions')
class Attraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  schedule_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Attraction;
