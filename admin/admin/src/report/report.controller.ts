
import { Controller, Post, Get, Put, Delete, Param, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { RecordService } from './report.service';
import { Record } from './report.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('create')
  async createRecord(@Body() data: Partial<Record>) {
    try {
      const record = await this.recordService.createRecord(data);
      return {
        message: 'Record created successfully',
        data: record,
      };
    } catch (error) {
      throw new HttpException('Failed to create record', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getRecordById(@Param('id') id: number) {
    try {
      const record = await this.recordService.getRecordById(id);
      return {
        message: 'Record retrieved successfully',
        data: record,
      };
    } catch (error) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateRecord(@Param('id') id: number, @Body() data: Partial<Record>) {
    try {
      const updatedRecord = await this.recordService.updateRecord(id, data);
      return {
        message: 'Record updated successfully',
        data: updatedRecord,
      };
    } catch (error) {
      throw new HttpException('Failed to update record', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: number) {
    try {
      await this.recordService.deleteRecord(id);
      return {
        message: 'Record deleted successfully',
      };
    } catch (error) {
      throw new HttpException('Failed to delete record', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllRecords(@Query() query: any) {
    try {
      const records = await this.recordService.getAllRecords(query);
      return {
        message: 'Records retrieved successfully',
        data: records,
      };
    } catch (error) {
      throw new HttpException('Failed to retrieve records', HttpStatus.BAD_REQUEST);
    }
  }
}
