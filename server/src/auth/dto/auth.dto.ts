import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginVo {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class VerifyJwtDto {
  @IsString()
  @IsNotEmpty()
  jwt: string;
}

export class VerifyJwtVo {
  @IsNumber()
  @IsNotEmpty()
  exp: number;
}
