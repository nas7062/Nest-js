import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentailDto } from './dto/user-credential.dto';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) { }
  async signUp(userCredentailDto: UserCredentailDto): Promise<UserEntity> {
    const { username, password } = userCredentailDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({ username, password: hashedPassword });
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(userCredentailDto: UserCredentailDto): Promise<{ accessToken: string }> {
    const { username, password } = userCredentailDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
