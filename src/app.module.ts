import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthGuard } from './auth.guard'
import { AuthModule } from './auth/auth.module'
import databaseConfig from './config/database.config'
import generalConfig from './config/general.config'
import databaseEnvironmentSchema from './schema/database-environment.schema'
import generalEnvironmentSchema from './schema/general-environment.schema'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [generalConfig, databaseConfig],
      validationSchema: Joi.object({
        ...generalEnvironmentSchema,
        ...databaseEnvironmentSchema
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('general.jwtSecret', { infer: true }),
        global: true,
        signOptions: { expiresIn: '1d' }
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host', { infer: true }),
        port: configService.get<number>('database.port', { infer: true }),
        username: configService.get<string>('database.user', { infer: true }),
        password: configService.get<string>('database.password', {
          infer: true
        }),
        database: configService.get<string>('database.name', { infer: true }),
        logging: configService.get<boolean>('database.logging', {
          infer: true
        }),
        synchronize: configService.get<boolean>('database.synchronize', {
          infer: true
        }),
        debug: configService.get<boolean>('database.debug', { infer: true }),
        entities: ['dist/**/*.entity{.ts,.js}']
      })
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }]
})
export class AppModule {}
