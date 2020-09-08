import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cities')
class City {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  is_base?: boolean;

  @Column()
  is_auditated?: boolean;

  @Column()
  latitude?: number;

  @Column()
  longitude?: number;

  @Column()
  initial_flood_date?: string;

  @Column()
  end_flood_date?: string;

  @Column()
  interdiction_observation?: string;

  @Column()
  city_observation?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default City;
