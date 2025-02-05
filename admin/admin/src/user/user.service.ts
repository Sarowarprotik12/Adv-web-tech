import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(userData);
    return this.userRepo.save(newUser);
  }

  async getUserById(userId: number): Promise<User> {
    return this.userRepo.findOne({ where: { userId } });
  }

  async deleteUserById(userId: number): Promise<void> {
    await this.userRepo.delete(userId);

  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();  
  }
  
}
