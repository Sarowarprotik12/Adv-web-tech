import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  prescriptionId: number;

  @Column({ type: 'int' })
  doctorId: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  fulfillmentStatus: string;

  @Column({ type: 'text', nullable: true })
  actions: string;
}
