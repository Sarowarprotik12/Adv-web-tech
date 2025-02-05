import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './report.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepo: Repository<Record>,
  ) {}

  async createRecord(data: Partial<Record>): Promise<Record> {
    const newRecord = this.recordRepo.create(data);
    return this.recordRepo.save(newRecord);
  }

  async getRecordById(id: number): Promise<Record> {
    const record = await this.recordRepo.findOne({ where: { id } });
    if (!record) {
      throw new Error('Record not found');
    }
    return record;
  }

  async updateRecord(id: number, data: Partial<Record>): Promise<Record> {
    const existingRecord = await this.getRecordById(id);
    const updatedRecord = Object.assign(existingRecord, data);
    return this.recordRepo.save(updatedRecord);
  }

  async deleteRecord(id: number): Promise<void> {
    const result = await this.recordRepo.delete(id);
    if (result.affected === 0) {
      throw new Error('Failed to delete record. Record not found.');
    }
  }

  async getAllRecords(query: any): Promise<Record[]> {
    // Optionally handle filtering/sorting based on query params
    const { disputeId, reportType, paymentcheck, actions } = query;
    const whereClause: any = {};

    if (disputeId) whereClause.disputeId = disputeId;
    if (reportType) whereClause.reportType = reportType;
    if (paymentcheck) whereClause.paymentcheck = paymentcheck;
    if (actions) whereClause.actions = actions;

    return this.recordRepo.find({ where: whereClause });
  }
}
