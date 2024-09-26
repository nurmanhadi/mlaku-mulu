import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { AdminGuard } from "src/auth/admin.guard";
import { JsonResponse } from "src/model/response";
import { DesResponse } from "./destination.schema";
import { CreateDesDto, UpdateDesDto } from "./destination.dto";

@Controller('api/v1/tourists/:touristId/trips/:tripId/destinations')
export class DestinationController {
    constructor(private desService: DestinationService){}

    @Get('/:desId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async findById(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number,
        @Param('desId', ParseIntPipe) desId: number,
    ): Promise<JsonResponse<DesResponse>> {
        const result = await this.desService.findDestinationById(touristId, tripId, desId)
        return {
            statusCode: 200,
            message: 'get destination success',
            data: result
        }
    }
    @Post()
    @HttpCode(201)
    @UseGuards(AdminGuard)
    async create(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number,
        @Body() req: CreateDesDto
    ): Promise<JsonResponse<DesResponse>> {
        const result = await this.desService.createDestination(touristId, tripId, req)
        return {
            statusCode: 201,
            message: 'create destination success',
            data: result
        }
    }
    @Patch('/:desId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async update(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number,
        @Param('desId', ParseIntPipe) desId: number,
        @Body() req: UpdateDesDto
    ): Promise<JsonResponse<DesResponse>> {
        const result = await this.desService.updateDestination(touristId, tripId, desId, req)
        return {
            statusCode: 200,
            message: 'update destination success',
            data: result
        }
    }
    @Delete('/:desId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async delete(
        @Param('touristId', ParseUUIDPipe) touristId: string,
        @Param('tripId', ParseIntPipe) tripId: number,
        @Param('desId', ParseIntPipe) desId: number
    ): Promise<JsonResponse<boolean>> {
        await this.desService.deleteDestination(touristId, tripId, desId)
        return {
            statusCode: 200,
            message: 'delete destination success',
            data: true
        }
    }
}