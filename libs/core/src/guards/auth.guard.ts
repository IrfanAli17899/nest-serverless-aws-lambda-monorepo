import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { UserAttributes } from '@apps/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '@apps/user/entities/token.entity';

interface AuthGuardReq {
  headers: { authorization: string };
  user: UserAttributes & { token: string };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(Token)
    private readonly tokenModel: typeof Token,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthGuardReq>();
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new BadRequestException('Please provide auth token');
    const tokenObject = await this.tokenModel.findOne({
      where: { token },
      include: ['user'],
    });
    if (!tokenObject) throw new BadRequestException('Invalid auth token');
    req.user = { ...tokenObject.user.get({ plain: true }), token };
    return Promise.resolve(true);
  }
}

export function AuthedOnly() {
  return UseGuards(AuthGuard);
}
