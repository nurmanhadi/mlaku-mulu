import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigsModule } from './configs/configs.module';
import { AuthModule } from './auth/auth.module';
import { TouristModule } from './tourist/tourist.module';
import { TripModule } from './trip/trip.module';
import { DestinationModule } from './destination/destination.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { HistoryModule } from './history/history.module';
import { MetricModule } from './metric/metric.module';
import * as winston from 'winston';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigsModule,
    AuthModule,
    TouristModule,
    TripModule,
    DestinationModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Mlaku-Mulu', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 1000,
      },
    ]),
    HistoryModule,
    MetricModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
