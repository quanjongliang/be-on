import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GangActivityService } from './gang-activity.service';
import { CreateGangActivityDto } from './dto/create-gang-activity.dto';
import { UpdateGangActivityDto } from './dto/update-gang-activity.dto';

@Controller('gang-activity')
export class GangActivityController {
  constructor(private readonly gangActivityService: GangActivityService) {}

  @Post()
  create(@Body() createGangActivityDto: CreateGangActivityDto) {
    return this.gangActivityService.create(createGangActivityDto);
  }

  @Get()
  findAll() {
    return this.gangActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gangActivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGangActivityDto: UpdateGangActivityDto) {
    return this.gangActivityService.update(+id, updateGangActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gangActivityService.remove(+id);
  }
}
