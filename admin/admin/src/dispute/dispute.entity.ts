import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  partyOne: User;

  @ManyToOne(() => User, { nullable: false })
  partyTwo: User;

  @Column({ type: 'enum', enum: ['Payment Issue', 'Fraud', 'Service Dispute', 'Other'], default: 'Other' })
  disputeType: string;

  @Column({ type: 'enum', enum: ['Pending', 'Resolved', 'Rejected'], default: 'Pending' })
  resolutionStatus: string;

  @Column({ type: 'text', nullable: true })
  actions: string;

  @CreateDateColumn()
  createdAt: Date;
}
