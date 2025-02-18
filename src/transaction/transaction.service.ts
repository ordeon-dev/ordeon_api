import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const transaction = await this.prismaService.transaction.create({
      data: {
        description: createTransactionDto.description,
        amount: createTransactionDto.amount,
        categoryId: createTransactionDto.categoryId,
        vaultId: id,
        transactionType: createTransactionDto.transactionType,
      },
    });

    return { message: 'Transação criada com sucesso!', transaction };
  }

  async findOne(id: number) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new BadRequestException('Transação não encontrada!');
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new BadRequestException('Transação não encontrada!');
    }

    const updatedTransaction = await this.prismaService.transaction.update({
      where: {
        id,
      },
      data: {
        description: updateTransactionDto.description,
        amount: updateTransactionDto.amount,
        categoryId: updateTransactionDto.categoryId,
        transactionType: updateTransactionDto.transactionType,
      },
    });

    return { message: 'Transação atualizada com sucesso!', updatedTransaction };
  }

  async remove(id: number) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id,
      },
    });
    
    if (!transaction) {
      throw new BadRequestException('Transação não encontrada!');
    }
    
    await this.prismaService.transaction.delete({
      where: {
        id,
      },
    });
    
    return { message: 'Transação deletada com sucesso!' };
  }
}
