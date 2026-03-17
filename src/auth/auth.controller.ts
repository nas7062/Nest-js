import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentailDto } from './dto/user-credential.dto';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post("/signup")
  signUp(@Body(ValidationPipe) userCredentailDto: UserCredentailDto): Promise<UserEntity> {
    return this.authService.signUp(userCredentailDto);
  }

  @Post("/signin")
  signIn(@Body(ValidationPipe) userCredentailDto: UserCredentailDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(userCredentailDto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: UserEntity): void {
    console.log(user);
  }
}
