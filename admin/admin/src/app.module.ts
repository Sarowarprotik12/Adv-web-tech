import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { Login } from './login/login.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { PrescriptionModule } from './prescription/prescription.module';
import { Prescription } from './prescription/prescription.entity';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { MonitorModule } from './monitor/monitor.module';
import { DisputeModule } from './dispute/dispute.module';
import { Monitor } from './monitor/monitor.entity';
import { Dispute } from './dispute/dispute.entity';
import { Record } from './report/report.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'admins',
      entities: [Login,User,Prescription,Monitor,Dispute,Record,],
      synchronize: true,
    }),
    LoginModule,
    UserModule,
    PrescriptionModule,
    AuthModule,
    ReportModule,
    MonitorModule,
    DisputeModule,

    

  ],
  controllers: [AppController, ],
  providers: [AppService,],
})
export class AppModule {}
