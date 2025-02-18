import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Seeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    
    // migrate categories
    const categoriasFinanceiras = [
      { name: "Salário" },
      { name: "Freelance" },
      { name: "Investimentos" },
      { name: "Presentes" },
      { name: "Negócios" },
      { name: "Aluguel Recebido" },
      { name: "Outros" },
      { name: "Alimentação & Mercado" },
      { name: "Moradia & Aluguel" },
      { name: "Contas & Serviços" },
      { name: "Transporte" },
      { name: "Lazer & Entretenimento" },
      { name: "Compras" },
      { name: "Saúde & Bem-estar" }
    ];
    
    await this.prisma.category.createMany({
      data: categoriasFinanceiras,
    });
    
    console.log('Database seeded successfully!');
  }
}