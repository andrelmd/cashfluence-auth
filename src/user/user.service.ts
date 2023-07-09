import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hashSync } from 'bcrypt'
import { QueryFailedError, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save({
        email: createUserDto.email,
        password: hashSync(createUserDto.password, 10),
        name: createUserDto.name
      })
      return new UserDto(newUser)
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log(JSON.stringify(err))
        if (err.driverError.code === '23505')
          throw new ConflictException('Email already exists')
      }
    }
  }

  async findMe(id: number) {
    const user = await this.usersRepository.findOneBy({ id })

    if (!user) throw new NotFoundException('User not found')

    return new UserDto(user)
  }
}
