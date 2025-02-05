import { Controller, Post, Get, Param, Body, Put, HttpException, HttpStatus } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { Dispute } from './dispute.entity';
import { User } from '../user/user.entity';

@Controller('disputes')
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @Post()
  async createDispute(
    @Body('partyOne') partyOne: User,
    @Body('partyTwo') partyTwo: User,
    @Body('disputeType') disputeType: string,
    @Body('actions') actions?: string,
  ): Promise<Dispute> {
    try {
      return await this.disputeService.createDispute(partyOne, partyTwo, disputeType, actions);
    } catch (error) {
      console.error('Error creating dispute:', error);
      throw new HttpException('Failed to create dispute', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllDisputes(): Promise<Dispute[]> {
    try {
      return await this.disputeService.getAllDisputes();
    } catch (error) {
      console.error('Error fetching disputes:', error);
      throw new HttpException('Failed to fetch disputes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getDisputeById(@Param('id') id: number): Promise<Dispute> {
    try {
      const dispute = await this.disputeService.getDisputeById(id);
      if (!dispute) {
        throw new HttpException('Dispute not found', HttpStatus.NOT_FOUND);
      }
      return dispute;
    } catch (error) {
      console.error('Error fetching dispute:', error);
      throw new HttpException('Failed to fetch dispute', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateResolutionStatus(
    @Param('id') id: number,
    @Body('resolutionStatus') resolutionStatus: string,
    @Body('actions') actions: string,
  ): Promise<Dispute> {
    try {
      return await this.disputeService.updateResolutionStatus(id, resolutionStatus, actions);
    } catch (error) {
      console.error('Error updating dispute:', error);
      throw new HttpException('Failed to update dispute resolution', HttpStatus.BAD_REQUEST);
    }
  }
}
