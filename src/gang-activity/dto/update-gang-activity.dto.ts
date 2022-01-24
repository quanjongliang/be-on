import { PartialType } from '@nestjs/mapped-types';
import { CreateGangActivityDto } from './create-gang-activity.dto';

export class UpdateGangActivityDto extends PartialType(CreateGangActivityDto) {}
