import { Controller, Get } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';

@Controller('api/prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Get()
  async getAllPrescriptions() {
    return this.prescriptionService.getPrescriptions();
  }
}
