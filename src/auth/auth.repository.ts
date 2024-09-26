import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configs/prisma.service';
import { RegisterAdminDto } from './auth.dto';
import { Admin, Tourist } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async checkEmailAdmin(email: string): Promise<Admin> {
    return this.prismaService.admin.findUnique({
      where: {
        email: email,
      },
    });
  }
  async checkEmailTourist(email: string): Promise<Tourist> {
    return this.prismaService.tourist.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createAdmin(req: RegisterAdminDto): Promise<Admin> {
    return this.prismaService.admin.create({
      data: req,
    });
  }
}
