import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class TouristGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extrackTokenFromHeader(req);
    if (!token) {
      throw new HttpException('token is undefined', 401);
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });
      req['tourist'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException('Token expired', 401);
      } else {
        throw new HttpException('Token is invalid', 401);
      }
    }
    return true;
  }

  private extrackTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
