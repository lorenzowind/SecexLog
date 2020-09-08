import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import City from '@modules/cities/infra/typeorm/entities/City';

@Entity('holidays')
class Holiday {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  city_id?: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city?: City;

  @Column()
  initial_date?: string;

  @Column()
  end_date?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Holiday;
