import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configs/prisma.service';
import { CreateDesDto, UpdateDesDto } from './destination.dto';
import { Destination } from '@prisma/client';
import { DesResponse } from './destination.schema';

@Injectable()
export class DestinationRepository {
  constructor(private prismaService: PrismaService) {}

  async destinationCount(desId: number): Promise<number> {
    return this.prismaService.destination.count({
      where: {
        id: desId,
      },
    });
  }
  async findDestinationById(desId: number): Promise<Destination> {
    return this.prismaService.destination.findUnique({
      where: {
        id: desId,
      },
    });
  }
  async createDestination(req: CreateDesDto): Promise<Destination> {
    return this.prismaService.destination.create({
      data: req,
    });
  }
  async updateDestination(
    desId: number,
    req: UpdateDesDto,
  ): Promise<DesResponse> {
    return this.prismaService.destination.update({
      where: {
        id: desId,
      },
      data: req,
    });
  }
  async deleteDestination(desId: number) {
    return this.prismaService.destination.delete({
      where: {
        id: desId,
      },
    });
  }
}
