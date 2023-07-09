import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compareSync } from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { SignInDto } from './dto/sign-in.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email })
    if (!user) throw new NotFoundException('User not found')

    if (!compareSync(loginDto.password, user.password))
      throw new UnauthorizedException('Password is incorrect')

    const payload = { sub: user.id, email: user.email }
    return { accessToken: await this.jwtService.signAsync(payload) }
  }
}
