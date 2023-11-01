import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDetail } from './dto/user.dto';
import { ApiUnifiedOkResponse } from 'src/utils';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiUnifiedOkResponse(UserDetail)
  getUser(@Param('id') id: string): Promise<UserDetail> {
    return this.userService.findById(id);
  }
}
