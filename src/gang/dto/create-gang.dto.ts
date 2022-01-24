import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { GANG_MESSAGE } from '../core';

export class CreateGangDto {
  @IsNotEmpty({ message: GANG_MESSAGE.NAME.NOT_EMPTY })
  @Length(10, 50, { message: GANG_MESSAGE.NAME.LENGTH_10_50 })
  name: string;

  @IsOptional()
  description?: string;
}
