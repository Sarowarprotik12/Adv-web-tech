import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './dispute.entity';
import { User } from '../user/user.entity';

@Injectable()
export class DisputeService {
  constructor(
    @InjectRepository(Dispute)
    private readonly disputeRepo: Repository<Dispute>,
  ) {}

  
  async createDispute(
    partyOne: User,
    partyTwo: User,
    disputeType: string,
    actions?: string,
  ): Promise<Dispute> {
    const dispute = this.disputeRepo.create({
      partyOne,
      partyTwo,
      disputeType,
      actions,
    });
    return this.disputeRepo.save(dispute);
  }

  
  async getAllDisputes(): Promise<Dispute[]> {
    return this.disputeRepo.find();
  }


  async getDisputeById(id: number): Promise<Dispute> {
    return this.disputeRepo.findOne({ where: { id } });
  }

  async updateResolutionStatus(
    id: number,
    resolutionStatus: string,
    actions: string,
  ): Promise<Dispute> {
    const dispute = await this.getDisputeById(id);
    if (!dispute) {
      throw new Error('Dispute not found');
    }
    dispute.resolutionStatus = resolutionStatus;
    dispute.actions = actions;
    return this.disputeRepo.save(dispute);
  }
}
