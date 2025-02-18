import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateVaultDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
