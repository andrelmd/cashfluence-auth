import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('general.port', { infer: true })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(port)
  Logger.log(`Service listening on port ${port}`)
}
bootstrap()
