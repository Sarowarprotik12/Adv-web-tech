import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
