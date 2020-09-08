import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import City from './City';

@Entity('related_cities')
class RelatedCity {
  @PrimaryColumn()
  id: string;

  @Column()
  city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  related_city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'related_city_id' })
  related_city: City;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RelatedCity;
