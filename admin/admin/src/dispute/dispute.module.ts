import { Module } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { DisputeController } from './dispute.controller';
import { Dispute } from './dispute.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[TypeOrmModule.forFeature([Dispute]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [DisputeService],
  controllers: [DisputeController]
})
export class DisputeModule {}
