import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}



  async findAll(user: any): Promise<Omit<User, 'password'>[]> {
    const hasDirecaoPermission = user.permission.includes('direcao');

    const users = await this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(
    id: number,
  ): Promise<Omit<User, 'password'> | { message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findUserByEmail(email: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { message: 'Usuário não encontrado.', status: 'error' };
    }

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Este e-mail já está em uso.');
      }
    }

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return { message: 'Usuário atualizado com sucesso.' };
  }

  async remove(id: number) {
    const userWithDependencies = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userWithDependencies) {
      return { message: 'Usuário não encontrado.', status: 'error' };
    }

    // vaults
    const vaults = await this.prisma.vault.findMany({
      where: {
        userId: id,
      },
    });

    if (vaults.length > 0) {
      throw new BadRequestException(
        'Não é possível remover um usuário com caixinhas associadas..',
      );
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Usuário removido com sucesso.' };
  }
}
