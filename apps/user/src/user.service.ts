import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as jsonWebToken from 'jsonwebtoken';
import { SignupDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@libs/core/config/config.service';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly user: typeof User,
    @InjectModel(Token)
    private readonly token: typeof Token,
    private readonly configService: ConfigService,
  ) {}
  async signup(obj: SignupDto) {
    const foundUser = await this.user.findOne({ where: { email: obj.email } });
    if (foundUser) {
      throw new BadRequestException('User already exist');
    }
    const user = await this.user.create({
      name: obj.name,
      email: obj.email,
      password: obj.password,
    });

    return this.createToken(user);
  }

  async login(obj: LoginDto) {
    const foundUser = await this.user.findOne({ where: { email: obj.email } });
    if (!foundUser) throw new NotFoundException('User not found');
    if (foundUser.password !== obj.password) {
      throw new BadRequestException('Please provide correct password');
    }
    return this.createToken(foundUser);
  }

  async createToken(user: User) {
    const token = jsonWebToken.sign(
      { user_id: user.id, email: user.email },
      this.configService.jwtSalt,
    );
    await this.token.create({ token, userId: user.id });
    return { ...user.toJSON(), token };
  }
}
