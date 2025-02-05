import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Login } from './login.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([Login]),
  JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '1h' },
  }),
],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
