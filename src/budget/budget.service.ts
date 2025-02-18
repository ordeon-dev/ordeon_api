import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BudgetService {
  
  constructor(private prisma: PrismaService) {}
  
  async create(createBudgetDto: CreateBudgetDto, id: number) {
    const budged = await this.prisma.budget.create({
      data: {
        vaultId: id,
        ...createBudgetDto
      }
    });
    
    return { message: 'Orçamento criado com sucesso!', budged };
  }

  async findOne(id: number) {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id
      }
    });
    
    if (!budget) {
      throw new BadRequestException('Orçamento não encontrado!');
    }
    
    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id
      }
    });

    if (!budget) {
      throw new BadRequestException('Orçamento não encontrado!');
    }

    const updatedBudget = await this.prisma.budget.update({
      where: {
        id
      },
      data: updateBudgetDto
    });

    return { message: 'Orçamento atualizado com sucesso!', updatedBudget };
  }

  async remove(id: number) {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id
      }
    });
    
    if (!budget) {
      throw new BadRequestException('Orçamento não encontrado!');
    }
    
    await this.prisma.budget.delete({
      where: {
        id
      }
    });
    
    return { message: 'Orçamento deletado com sucesso!' };
  }
}
