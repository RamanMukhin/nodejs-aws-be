import { Controller, All, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @All()
  async getHello(@Req() req, @Res() res): Promise<void> {
    return this.appService.getHello(req, res);
  }
}
