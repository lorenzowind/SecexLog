import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('opinions')
class Opinion {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

}

export default Opinion;
