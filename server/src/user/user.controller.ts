import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDetails } from './dto/user.dto';

@ApiTags('user')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails> {
    return this.userService.findById(id);
  }
}
