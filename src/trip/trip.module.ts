import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripRepository } from './trip.repository';
import { TouristModule } from 'src/tourist/tourist.module';

@Module({
    imports: [TouristModule],
    controllers: [TripController],
    providers: [TripService, TripRepository],
    exports: [TripRepository]
})
export class TripModule {}
