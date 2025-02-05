import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Monitor } from './monitor.entity';

@Injectable()
export class MonitorService {
    constructor(
        @InjectRepository(Monitor)
        private readonly monitorRepository: Repository<Monitor>,
      ) {}
    
      async createMonitor(data: Partial<Monitor>): Promise<Monitor> {
        const monitor = this.monitorRepository.create(data);
        return this.monitorRepository.save(monitor);
      }
    
      async findAll(): Promise<Monitor[]> {
        return this.monitorRepository.find();
      }
    
      async findOne(userId: number): Promise<Monitor | null> {
        return this.monitorRepository.findOne({ where: { userId } });
      }
    
      async updateMonitor(userId: number, data: Partial<Monitor>): Promise<void> {
        await this.monitorRepository.update(userId, data);
      }
    }
