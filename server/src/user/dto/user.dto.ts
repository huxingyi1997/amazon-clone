import { PickType } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { User } from '../user.schema';

export class UserDetail extends PickType(User, ['email', 'name']) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
