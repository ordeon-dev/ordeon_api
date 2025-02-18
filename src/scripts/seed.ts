import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CommandService } from '../command/command.service';

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const commandService = app.get(CommandService);

  await commandService.runSeeder();

  await app.close();
}

runSeeder()
  .then(() => {
    console.log('Seeder executado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao executar o seeder:', error);
    process.exit(1);
  });
