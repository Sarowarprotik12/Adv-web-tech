import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { Monitor } from './monitor.entity';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  async create(@Body() data: Partial<Monitor>) {
    return this.monitorService.createMonitor(data);
  }

  @Get()
  async findAll() {
    return this.monitorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') userId: number) {
    return this.monitorService.findOne(userId);
  }

  @Put(':id')
  async update(@Param('id') userId: number, @Body() data: Partial<Monitor>) {
    return this.monitorService.updateMonitor(userId, data);
  }
}
