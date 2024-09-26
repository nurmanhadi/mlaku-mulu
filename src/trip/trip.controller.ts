import { Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TripService } from "./trip.service";
import { JsonResponse } from "src/model/response";
import { TripResponse } from "./trip.schema";
import { AdminGuard } from "src/auth/admin.guard";
import { CreateTripDto, UpdateTripDto } from "./trip.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Controller('api/v1/tourists/:touristId/trips')
export class TripController {
    constructor(
        private tripService: TripService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ){}

    @Get()
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async findAll(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('per-page', ParseIntPipe) perPage: number = 1
    ): Promise<JsonResponse<TripResponse[]>> {
        const result = await this.tripService.findAllTrips(touristId, page, perPage)
        const totalCount = await this.tripService.totalCount()
        const pageCount = Math.ceil(totalCount / perPage)
        return {
            statusCode: 200,
            message: 'find all trip success',
            data: result,
            metadata: {
                page: page,
                per_page: perPage,
                page_count: pageCount,
                total_count: totalCount
            }
        }
    }

    @Get('/:tripId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async findById(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number
    ): Promise<JsonResponse<TripResponse>> {
        const result = await this.tripService.findTripById(touristId, tripId)
        return {
            statusCode: 200,
            message: 'find trip success',
            data: result
        }
    }

    @Post()
    @HttpCode(201)
    @UseGuards(AdminGuard)
    async create(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Body() req: CreateTripDto
    ): Promise<JsonResponse<TripResponse>> {
        const result = await this.tripService.createTrip(touristId, req)
        return {
            statusCode: 201,
            message: 'create trip success',
            data: result
        }
    }

    @Patch('/:tripId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async update(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number,
        @Body() req: UpdateTripDto
    ): Promise<JsonResponse<TripResponse>> {
        const result = await this.tripService.updateTrip(touristId, tripId, req)
        return {
            statusCode: 200,
            message: 'update trip success',
            data: result
        }
    }

    @Delete('/:tripId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async delete(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number,
    ): Promise<JsonResponse<boolean>> {
        await this.tripService.deleteTrip(touristId,tripId)
        return {
            statusCode: 200,
            message: 'delete trip success',
            data: true
        }
    }
}