import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepo: Repository<Prescription>,
  ) {}

  async getPrescriptions(): Promise<Prescription[]> {
    console.log("Fetching prescriptions...");
    const prescriptions = await this.prescriptionRepo.find();
    console.log("Fetched prescriptions:", prescriptions);
    return prescriptions;
  }
}
