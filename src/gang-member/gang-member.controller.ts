import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GangMemberService } from './gang-member.service';
import { CreateGangMemberDto } from './dto/create-gang-member.dto';
import { UpdateGangMemberDto } from './dto/update-gang-member.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gangMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGangMemberDto: UpdateGangMemberDto) {
    return this.gangMemberService.update(+id, updateGangMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gangMemberService.remove(+id);
  }
}
