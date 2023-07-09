import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './public.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHealthCheck(): string {
    return this.appService.getHealthCheck()
  }
}
