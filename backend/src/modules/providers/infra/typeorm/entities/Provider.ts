import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Modal from '@modules/modals/infra/typeorm/entities/Modal';

@Entity('providers')
class Provider {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  modal_id: string;

  @ManyToOne(() => Modal)
  @JoinColumn({ name: 'modal_id' })
  modal: Modal;

  @Column()
  preference: 'CPF' | 'CNPJ';

  @Column()
  preference_data: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Provider;
