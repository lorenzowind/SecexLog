import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('holidays')
class Holiday {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  city_name?: string;

  @Column()
  initial_date?: string;

  @Column()
  end_date?: string;
}

export default Holiday;
