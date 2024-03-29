import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { hash, compare } from 'bcrypt';

import { UserService } from '../user/user.service';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { UserDetail } from '../user/dto/user.dto';
import { LoginVo, VerifyJwtVo } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetail> {
    const { name, email, password } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetail | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserDTO): Promise<LoginVo> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<VerifyJwtVo> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
