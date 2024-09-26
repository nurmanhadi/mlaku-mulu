import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { LoggerMiddleware } from './logger.middleware';

@Global()
@Module({
    providers: [PrismaService, {
        provide: APP_FILTER,
        useClass: ErrorFilter
    }],
    exports: [PrismaService]
})
export class ConfigsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(LoggerMiddleware)
        .forRoutes('*')
    }
}
