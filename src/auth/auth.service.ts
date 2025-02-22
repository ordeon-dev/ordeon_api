import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async loginWithEmail(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: Omit<User, 'password'> } | null> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Dados Incorretos..!',
      });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'Dados Incorretos..!',
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{
    access_token: string;
    user: Omit<User, 'password'>;
    message: string;
  } | null> {
    console.log(createUserDto);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(`Este e-mail já está em uso.`);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    if (!createUser) {
      throw new BadRequestException('Erro ao criar conta..!');
    }

    const payload = {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
    };

    const { password, ...userWithoutPassword } = createUser;

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: userWithoutPassword,
      message: 'Cadastro realizado com sucesso!!',
    };
  }
}
