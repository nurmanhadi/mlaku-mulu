import { HttpException, Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { CreateTripDto, UpdateTripDto } from './trip.dto';
import { TripResponse } from './trip.schema';
import { TouristRepository } from 'src/tourist/tourist.repository';

@Injectable()
export class TripService {
  constructor(
    private tripRepository: TripRepository,
    private touristRepository: TouristRepository,
  ) {}

  async totalCount(): Promise<number> {
    const result = await this.tripRepository.totalCount();
    return result;
  }

  async findAllTrips(
    touristId: string,
    page: number,
    perPage: number,
  ): Promise<TripResponse[]> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const result = await this.tripRepository.findManyTrips(page, perPage);

    return result;
  }
  async findTripById(touristId: string, tripId: number): Promise<TripResponse> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }
    const result = await this.tripRepository.findTripById(tripId);
    return result;
  }

  async createTrip(
    touristId: string,
    req: CreateTripDto,
  ): Promise<TripResponse> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    req.touristId = touristId;
    const result = await this.tripRepository.createTrip(req);
    return result;
  }

  async updateTrip(
    touristId: string,
    tripId: number,
    req: UpdateTripDto,
  ): Promise<TripResponse> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }

    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }

    const result = await this.tripRepository.updateTrip(tripId, req);
    return result;
  }

  async deleteTrip(touristId: string, tripId: number): Promise<boolean> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }
    await this.tripRepository.deleteTrip(tripId);
    return true;
  }
}
