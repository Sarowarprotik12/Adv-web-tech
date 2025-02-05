import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  disputeId: string;  

  @Column()
  reportType: string;  

  @Column()
  paymentcheck: string;  

  @Column()
  generatedOn: Date;  

  @Column()
  actions: string;  
}
