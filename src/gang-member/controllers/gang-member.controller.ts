import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GangMemberService } from '../services';
import { CreateGangMemberDto } from '../dto/create-gang-member.dto';
import { UpdateGangMemberDto } from '../dto/update-gang-member.dto';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators';
import { User } from 'src/entities';
import { CheckMemberGang } from '..';

@UseGuards(JwtAuthGuard)
@Controller('gang-member')
export class GangMemberController {
  constructor(private readonly gangMemberService: GangMemberService) {}

  @Post()
  create(@Body() createGangMemberDto: CreateGangMemberDto) {
    return this.gangMemberService.create(createGangMemberDto);
  }

  @Get()
  findAll() {
    return this.gangMemberService.findAll();
  }

  @Get('get-invite')
  @UseGuards(CheckMemberGang)
  getAllInvite(@CurrentUser() user: User) {
    return this.gangMemberService.getAllInvite(user);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGangMemberDto: UpdateGangMemberDto,
  ) {
    return this.gangMemberService.update(+id, updateGangMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gangMemberService.remove(+id);
  }
}
