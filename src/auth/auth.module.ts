import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { permission } from 'process';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '86400s' },
      }),
    }),
  ],
  providers: [AuthService, UserService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
