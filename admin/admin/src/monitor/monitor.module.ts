import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { Monitor } from './monitor.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


@Module({
   imports:[TypeOrmModule.forFeature([Monitor]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [MonitorService],
  controllers: [MonitorController]
})
export class MonitorModule {}
