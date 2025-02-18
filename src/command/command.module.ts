import { Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { CommandService } from './command.service';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [Seeder, CommandService],
  imports: [PrismaModule],
  exports: [CommandService],
})
export class CommandModule {}