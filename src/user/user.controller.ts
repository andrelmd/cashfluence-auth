import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Public } from 'src/public.decorator'
import { Request } from 'express'
import { User } from './entities/user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('/me')
  findMe(@Req() request: Request & { sub: number }) {
    return this.userService.findMe(request.sub)
  }
}
