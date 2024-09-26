import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TouristService } from "./tourist.service";
import { CreateTouristDto, TouristIdDto, UpdateTouristDto } from "./tourist.dto";
import { JsonResponse } from "src/model/response";
import { TouristResponse } from "./tourist.schema";
import { AdminGuard } from "src/auth/admin.guard";

@Controller('api/v1/tourists')
export class TouristController {
    constructor(private touristService: TouristService){}

    @Get()
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async findAll(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('per-page', ParseIntPipe) perPage: number = 5,
    ): Promise<JsonResponse<TouristResponse[]>> {
        const result = await this.touristService.findAllTourist(page, perPage)
        const totalCount = await this.touristService.totalCount()
        const pageCount = Math.ceil(totalCount / perPage)
        return {
            statusCode: 200,
            message: 'find all tourist success',
            data: result,
            metadata: {
                page: page,
                per_page: perPage,
                page_count: pageCount,
                total_count: totalCount
            }
        }
    }

    @Get('/:touristId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async findById(@Param('touristId', ParseUUIDPipe) touristId: string): Promise<JsonResponse<TouristResponse>> {
        const result = await this.touristService.findTouristById(touristId)
        return {
            statusCode: 200,
            message: 'get tourist success',
            data: result
        }
    }

    @Post()
    @HttpCode(201)
    @UseGuards(AdminGuard)
    async create(@Body() req: CreateTouristDto): Promise<JsonResponse<TouristResponse>> {
        const result = await this.touristService.createTourist(req)
        return {
            statusCode: 201,
            message: 'create tourist success',
            data: result
        }
    }

    @Patch('/:touristId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async update(@Param('touristId', ParseUUIDPipe) touristId: string, @Body() req: UpdateTouristDto): Promise<JsonResponse<TouristResponse>> {
        const result = await this.touristService.updateTourist(touristId, req)
        return {
            statusCode: 200,
            message: 'update tourist success',
            data: result
        }
    }

    @Delete('/:touristId')
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async delete(@Param('touristId', ParseUUIDPipe) touristId: string): Promise<JsonResponse<boolean>> {
        await this.touristService.deleteTourist(touristId)
        return {
            statusCode: 200,
            message: 'delete tourist success',
            data: true
        }
    }
}