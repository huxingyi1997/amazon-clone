import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Public } from './utils';
import { helloPath } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(helloPath)
  @Public()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }
}
