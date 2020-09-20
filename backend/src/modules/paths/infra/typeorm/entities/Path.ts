import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import City from '@modules/cities/infra/typeorm/entities/City';
import Modal from '@modules/modals/infra/typeorm/entities/Modal';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';

@Entity('paths')
class Path {
  @PrimaryColumn()
  id: string;

  @Column()
  origin_city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'origin_city_id' })
  origin_city: City;

  @Column()
  destination_city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'destination_city_id' })
  destination_city: City;

  @Column()
  modal_id: string;

  @ManyToOne(() => Modal)
  @JoinColumn({ name: 'modal_id' })
  modal: Modal;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  boarding_days: string;

  @Column()
  boarding_times: string;

  @Column()
  duration: number;

  @Column()
  mileage: number;

  @Column()
  cost: number;

  @Column()
  boarding_place: string;

  @Column()
  departure_place: string;

  @Column()
  is_hired: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Path;
