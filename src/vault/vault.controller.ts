import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { User } from 'src/user/decorators/Index.decorator';

@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post()
  create(@Body() createVaultDto: CreateVaultDto, @User() user) {
    return this.vaultService.create(createVaultDto, +user.id);
  }

  @Get()
  findAll(@User() user) {
    return this.vaultService.findAll(+user.id);
  }
  
  @Get('/view/:id')
  view(@Param('id') id: string, @User() user) {
    return this.vaultService.view(+id, +user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user) {
    return this.vaultService.findOne(+id, +user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaultDto: UpdateVaultDto) {
    return this.vaultService.update(+id, updateVaultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaultService.remove(+id);
  }
}
