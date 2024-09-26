import { HttpException, Injectable } from '@nestjs/common';
import { DestinationRepository } from './destination.repository';
import { TripRepository } from 'src/trip/trip.repository';
import { TouristRepository } from 'src/tourist/tourist.repository';
import { CreateDesDto, UpdateDesDto } from './destination.dto';
import { DesResponse } from './destination.schema';

@Injectable()
export class DestinationService {
  constructor(
    private touristRepository: TouristRepository,
    private tripRepository: TripRepository,
    private desRepository: DestinationRepository,
  ) {}

  async findDestinationById(
    touristId: string,
    tripId: number,
    desId: number,
  ): Promise<DesResponse> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }
    const checkDes = await this.desRepository.destinationCount(desId);
    if (checkDes === 0) {
      throw new HttpException('destination not found', 404);
    }
    const result = await this.desRepository.findDestinationById(desId);
    return result;
  }
  async createDestination(
    touristId: string,
    tripId: number,
    req: CreateDesDto,
  ): Promise<DesResponse> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }
    req.tripId = tripId;
    const result = await this.desRepository.createDestination(req);
    return result;
  }
  async updateDestination(
    touristId: string,
    tripId: number,
    desId: number,
    req: UpdateDesDto,
  ): Promise<DesResponse> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }
    const checkDes = await this.desRepository.destinationCount(desId);
    if (checkDes === 0) {
      throw new HttpException('destination not found', 404);
    }
    const result = await this.desRepository.updateDestination(desId, req);
    return result;
  }
  async deleteDestination(
    touristId: string,
    tripId: number,
    desId: number,
  ): Promise<boolean> {
    const checkTourist = await this.touristRepository.findById(touristId);
    if (!checkTourist) {
      throw new HttpException('tourist not found', 404);
    }
    const checkTrip = await this.tripRepository.countTrip(tripId);
    if (checkTrip === 0) {
      throw new HttpException('trip not found', 404);
    }
    const checkDes = await this.desRepository.destinationCount(desId);
    if (checkDes === 0) {
      throw new HttpException('destination not found', 404);
    }
    await this.desRepository.deleteDestination(desId);
    return true;
  }
}
