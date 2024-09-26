import { HttpException, Injectable } from '@nestjs/common';
import { TouristRepository } from './tourist.repository';
import { CreateTouristDto, UpdateTouristDto } from './tourist.dto';
import { TouristResponse } from './tourist.schema';
import * as brcypt from 'bcrypt';

@Injectable()
export class TouristService {
  constructor(private touristRepository: TouristRepository) {}

  async totalCount(): Promise<number> {
    const totalCount = await this.touristRepository.totalCount();
    return totalCount;
  }

  async findAllTourist(
    page: number,
    perPage: number,
  ): Promise<TouristResponse[]> {
    const result = await this.touristRepository.findAll(page, perPage);
    const tourists = result.map((tourist) => ({
      id: tourist.id,
      name: tourist.name,
      email: tourist.email,
      passportNumber: tourist.passportNumber,
      phone: tourist.phone,
      address: tourist.address,
      createdAt: tourist.createdAt,
      updatedAt: tourist.updatedAt,
    }));
    return tourists;
  }

  async findTouristById(touristId: string): Promise<TouristResponse> {
    const checkId = await this.touristRepository.findById(touristId);
    if (!checkId) {
      throw new HttpException('tourist not found', 404);
    }
    const result = await this.touristRepository.findTouristById(touristId);
    return result;
  }

  async createTourist(req: CreateTouristDto): Promise<TouristResponse> {
    const existEmail = await this.touristRepository.existEmail(req.email);
    if (existEmail != 0) {
      throw new HttpException('email has created', 400);
    }
    const existPasportNumber = await this.touristRepository.existPasportNumber(
      req.passportNumber,
    );
    if (existPasportNumber != 0) {
      throw new HttpException('passport has created', 400);
    }
    const existPhone = await this.touristRepository.existPhone(req.phone);
    if (existPhone != 0) {
      throw new HttpException('phone has created', 400);
    }

    const hash = brcypt.hashSync(req.password, 10);
    req.password = hash;

    const result = await this.touristRepository.createTourist(req);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      passportNumber: result.passportNumber,
      phone: result.phone,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async updateTourist(
    id: string,
    req: UpdateTouristDto,
  ): Promise<TouristResponse> {
    const checkId = await this.touristRepository.findById(id);
    if (!checkId) {
      throw new HttpException('tourist not found', 404);
    }

    const result = await this.touristRepository.updateTourist(id, req);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      passportNumber: result.passportNumber,
      phone: result.phone,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async deleteTourist(id: string): Promise<boolean> {
    const checkId = await this.touristRepository.findById(id);
    if (!checkId) {
      throw new HttpException('tourist not found', 404);
    }
    await this.touristRepository.deleteTourist(id);
    return true;
  }
}
