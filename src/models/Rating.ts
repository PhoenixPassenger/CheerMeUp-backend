import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from './Client';
import Store from './Store';

@Entity('ratings')
class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @Column()
  comment: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  store_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'store_id' })
  store: Store;
  /*
  @ManyToOne(type => Client, client => client.ratings)
  client: Client;
  */
}

export default Rating;
