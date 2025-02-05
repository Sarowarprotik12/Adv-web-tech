import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Monitor {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  username: string;

  @Column({ default: 0 })
  logins: number;

  @CreateDateColumn()
  appointmentCreated: Date;

  @CreateDateColumn()
  prescriptionGenerated: Date;

  @UpdateDateColumn()
  lastActivity: Date;
}
