import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDetail } from './dto/user.dto';
import { ApiUnifiedOkResponse } from 'src/utils';

@ApiTags('user')
@ApiBearerAuth()
@ApiExtraModels(UserDetail)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiUnifiedOkResponse(UserDetail)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetail> {
    return this.userService.findById(id);
  }
}
