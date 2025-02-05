import { Module } from '@nestjs/common';
import { RecordService } from './report.service';
import { RecordController } from './report.controller';
import { Record } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[TypeOrmModule.forFeature([Record]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),],
  providers: [RecordService],
  controllers: [RecordController]
})
export class ReportModule {}
