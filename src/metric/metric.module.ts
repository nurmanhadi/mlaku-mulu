import { Module } from '@nestjs/common';
import { MetricController } from './mectric.controller';
import { MetricService } from './metric.service';

@Module({
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
