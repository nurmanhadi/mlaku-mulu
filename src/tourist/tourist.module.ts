import { Module } from '@nestjs/common';
import { TouristController } from './tourist.controller';
import { TouristService } from './tourist.service';
import { TouristRepository } from './tourist.repository';

@Module({
  controllers: [TouristController],
  providers: [TouristService, TouristRepository],
  exports: [TouristRepository],
})
export class TouristModule {}
