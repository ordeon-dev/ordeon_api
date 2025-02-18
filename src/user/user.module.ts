import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { jwtConstants } from './../auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '86400s' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthGuard, AuthService],
  exports: [UserService],
})
export class UserModule {}
