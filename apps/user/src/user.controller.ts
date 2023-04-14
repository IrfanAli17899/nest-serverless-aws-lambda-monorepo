import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { AuthedOnly } from '@libs/core/guards/auth.guard';
import { User } from '@libs/core/decorators/user.decorator';
import { UserAttributes } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @AuthedOnly()
  @Get('/me')
  me(@User() user: UserAttributes) {
    delete user.password;
    return user;
  }
}
