import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterAdminDto } from './auth.dto';
import { JsonResponse } from 'src/model/response';
import { AdminResponse } from './auth.schema';
import { Request, Response } from 'express';
import { AdminGuard } from './admin.guard';
import { TouristGuard } from './tourist.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/admins/register')
  @HttpCode(201)
  async registerAdmin(
    @Body() req: RegisterAdminDto,
  ): Promise<JsonResponse<AdminResponse>> {
    const result = await this.authService.createAdmin(req);

    return {
      statusCode: 201,
      message: 'register admin success',
      data: result,
    };
  }

  @Post('/admins/login')
  @HttpCode(200)
  async LoginAdmin(@Body() req: LoginDto, @Res() res: Response) {
    const result = await this.authService.loginAdmin(req);
    const accessToken = await this.authService.generateAccessToken(result.id);
    const refreshToken = await this.authService.generateRefreshToken(result.id);
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.json({
      statusCode: 200,
      message: 'login admin success',
      access_token: accessToken,
    });
  }
  @Post('/tourists/login')
  @HttpCode(200)
  async LoginTourist(@Body() req: LoginDto, @Res() res: Response) {
    const result = await this.authService.loginTourist(req);
    const accessToken = await this.authService.generateAccessToken(result.id);
    const refreshToken = await this.authService.generateRefreshToken(result.id);
    res.cookie('refresh-token-tourist', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.json({
      statusCode: 200,
      message: 'login tourist success',
      access_token: accessToken,
    });
  }

  @Post('/admins/logout')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async logoutAdmin(@Res() res: Response) {
    res.cookie('refresh-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
    });

    return res.json({
      statusCode: 200,
      message: 'logout admin success',
      data: true,
    });
  }
  @Post('/tourists/logout')
  @HttpCode(200)
  @UseGuards(TouristGuard)
  async logoutTourist(@Res() res: Response) {
    res.cookie('refresh-token-tourist', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
    });

    return res.json({
      statusCode: 200,
      message: 'logout tourist success',
      data: true,
    });
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Req() req: Request) {
    const newAccessToken = await this.authService.generateNewAccessToken(req);
    return {
      statusCode: 200,
      message: 'generate new access token success',
      access_token: newAccessToken,
    };
  }
  @Post('refresh-token-tourist')
  @HttpCode(200)
  async refreshTokenTourist(@Req() req: Request) {
    const newAccessToken =
      await this.authService.generateNewAccessTokenTourist(req);
    return {
      statusCode: 200,
      message: 'generate new access token success',
      access_token: newAccessToken,
    };
  }
}
