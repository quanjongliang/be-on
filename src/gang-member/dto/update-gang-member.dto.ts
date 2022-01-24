import { PartialType } from '@nestjs/mapped-types';
import { CreateGangMemberDto } from './create-gang-member.dto';

export class UpdateGangMemberDto extends PartialType(CreateGangMemberDto) {}
