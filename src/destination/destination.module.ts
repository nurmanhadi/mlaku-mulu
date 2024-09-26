import { Module } from '@nestjs/common';
import { TripModule } from 'src/trip/trip.module';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { DestinationRepository } from './destination.repository';
import { TouristModule } from 'src/tourist/tourist.module';

@Module({
    imports: [TripModule, TouristModule],
    controllers: [DestinationController],
    providers: [DestinationService, DestinationRepository]
})
export class DestinationModule {}
