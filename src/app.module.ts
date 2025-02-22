import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CommandModule } from './command/command.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotificationGateway } from './notification/notification.gateway';
import { VaultModule } from './vault/vault.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { BudgetModule } from './budget/budget.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    UserModule,
    CommandModule,
    AuthModule,
    JwtModule,
    VaultModule,
    CategoryModule,
    TransactionModule,
    BudgetModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    NotificationGateway,
  ],
})
export class AppModule {}
