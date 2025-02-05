import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 
@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ unique: true })
  email: string;
 
  @Column()
  password: string;
 
  @Column()
  name: string;
 
  @Column()
  phoneNumber: string;
 
  @Column({ unique: true })
  nidNumber: string;
 
  @Column()
  address: string;
 
  @Column()
  dateOfBirth: Date;
 
  @Column()
  gender: string;
 
}