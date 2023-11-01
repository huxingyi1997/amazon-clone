import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { UserDetail } from '../user/dto/user.dto';
import { LoginVo, VerifyJwtDto, VerifyJwtVo } from './dto/auth.dto';
import {
  ApiUnifiedCreatedResponse,
  ApiUnifiedOkResponse,
  Public,
} from 'src/utils';

@ApiTags('auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiUnifiedCreatedResponse(UserDetail)
  register(@Body() user: NewUserDTO): Promise<UserDetail> {
    return this.authService.register(user);
  }

  @Post('login')
  @ApiUnifiedOkResponse(LoginVo)
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<LoginVo> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @ApiUnifiedOkResponse(VerifyJwtVo)
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: VerifyJwtDto): Promise<VerifyJwtVo> {
    return this.authService.verifyJwt(payload.jwt);
  }
}
