import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VaultService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVaultDto: CreateVaultDto, userId: number) {
    
    const vault = await this.prisma.vault.create({
      data: {
        userId: userId,
        ...createVaultDto
      }
    });
    
    return { message: 'Caixinha criada com sucesso', vault };
  }

  async findAll(userId: number) {
    const vaults = await this.prisma.vault.findMany({
      where: {
        userId: userId
      }
    });
    
    return vaults;
  }
  
  async view(id: number, userId: number) {
    const vault = await this.prisma.vault.findUnique({
      where: {
        id: id,
        userId: userId
      },
      include: {
        Transaction: true,
        User: true,
        Budget: true
      }
    });
    
    if(!vault) {
      throw new BadRequestException('Caixinha não encontrada');
    }
    
    return vault;
  }

  async findOne(id: number, userId: number) {
    const vault = await this.prisma.vault.findUnique({
      where: {
        id: id,
        userId: userId
      }
    });
    
    if(!vault) {
      throw new BadRequestException('Caixinha não encontrada');
    }
    
    return vault;
  }

  async update(id: number, updateVaultDto: UpdateVaultDto) {
    const vault = await this.prisma.vault.findUnique({
      where: {
        id: id
      }
    });
    
    if(!vault) {
      throw new BadRequestException('Caixinha não encontrada');
    }
    
    await this.prisma.vault.update({
      where: {
        id: id
      },
      data: updateVaultDto
    });
    
    return {message: 'Caixinha atualizada com sucesso'};
    
  }

  async remove(id: number) {
    const vault = await this.prisma.vault.findUnique({
      where: {
        id: id
      }
    });
    
    if(!vault) {
      throw new BadRequestException('Caixinha não encontrada');
    }

    const transactions = await this.prisma.transaction.findMany({
      where: {
        vaultId: id
      }
    });
    
    if(transactions.length > 0) {
      throw new BadRequestException('Caixinha não pode ser deletada pois possui transações');
    }

    await this.prisma.vault.delete({
      where: {
        id: id
      }
    });
    
    return {message: 'Caixinha deletada com sucesso'};
  }
}
