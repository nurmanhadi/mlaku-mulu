import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, register } from 'prom-client';

@Injectable()
export class MetricService {
  constructor() {
    collectDefaultMetrics();
  }
  async getMatric() {
    return register.metrics();
  }
}
