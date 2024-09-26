import { Injectable } from '@nestjs/common';
import { Trip } from '@prisma/client';
import { TripRepository } from 'src/trip/trip.repository';

@Injectable()
export class HistoryService {
  constructor(private tripRepository: TripRepository) {}

  async getHistory(touristId: string): Promise<Trip[]> {
    return this.tripRepository.findTripByTouristId(touristId);
  }
}
