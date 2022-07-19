import { Controller, Get } from '@nestjs/common';
import { Public } from '@nekotoko/api/auth-shared';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getData() {
    return this.appService.getData();
  }
}
