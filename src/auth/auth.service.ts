import { HttpException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto, RegisterAdminDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AdminResponse } from './auth.schema';
import { TouristResponse } from 'src/tourist/tourist.schema';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createAdmin(req: RegisterAdminDto): Promise<AdminResponse> {
    const checkEmailAdmin = await this.authRepository.checkEmailAdmin(
      req.email,
    );
    if (checkEmailAdmin) {
      throw new HttpException('email already register', 400);
    }
    const hashPassword = bcrypt.hashSync(req.password, 10);
    req.password = hashPassword;

    const result = await this.authRepository.createAdmin(req);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async loginAdmin(req: LoginDto): Promise<AdminResponse> {
    const checkAdmin = await this.authRepository.checkEmailAdmin(req.email);
    if (!checkAdmin) {
      throw new HttpException('email or password is invalid', 400);
    }
    const comparePassword = bcrypt.compareSync(
      req.password,
      checkAdmin.password,
    );
    if (!comparePassword) {
      throw new HttpException('email or password is invalid', 400);
    }
    return checkAdmin;
  }
  async loginTourist(req: LoginDto): Promise<TouristResponse> {
    const checkTourist = await this.authRepository.checkEmailTourist(req.email);
    if (!checkTourist) {
      throw new HttpException('email or password is invalid', 400);
    }
    const comparePassword = bcrypt.compareSync(
      req.password,
      checkTourist.password,
    );
    if (!comparePassword) {
      throw new HttpException('email or password is invalid', 400);
    }
    return checkTourist;
  }

  async generateNewAccessToken(req: Request): Promise<string> {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) {
      throw new HttpException('no refresh token provided', 401);
    }
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });
      const id = payload.id;
      const newAccessToken = await this.generateAccessToken(id);
      return newAccessToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException('Token expired', 401);
      } else {
        throw new HttpException('Token is invalid', 401);
      }
    }
  }
  async generateNewAccessTokenTourist(req: Request): Promise<string> {
    const refreshToken = req.cookies['refresh-token-tourist'];
    if (!refreshToken) {
      throw new HttpException('no refresh token provided', 401);
    }
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });
      const id = payload.id;
      const newAccessToken = await this.generateAccessToken(id);
      return newAccessToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException('Token expired', 401);
      } else {
        throw new HttpException('Token is invalid', 401);
      }
    }
  }

  async generateAccessToken(id: string): Promise<string> {
    const payload = { id: id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    return accessToken;
  }
  async generateRefreshToken(id: string): Promise<string> {
    const payload = { id: id };
    const RefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return RefreshToken;
  }
}
