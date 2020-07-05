import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Store from './Store';

@Entity('menus')
class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  store_id: string;

  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Menu;
