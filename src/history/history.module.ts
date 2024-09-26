import { Module } from '@nestjs/common';
import { TripModule } from 'src/trip/trip.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [TripModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
