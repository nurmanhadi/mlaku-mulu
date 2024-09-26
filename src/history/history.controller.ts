import { Controller, Get, HttpCode, Req, UseGuards } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { TouristGuard } from "src/auth/tourist.guard";
import { Request } from "express";
import { JsonResponse } from "src/model/response";
import { TripResponse } from "src/trip/trip.schema";

@Controller('api/v1/history')
export class HistoryController {
    constructor(private historyService: HistoryService){}

    @Get()
    @HttpCode(200)
    @UseGuards(TouristGuard)
    async findAll(@Req() req: Request): Promise<JsonResponse<TripResponse[]>> {
        const touristId = req['tourist'].id
        const result = await this.historyService.getHistory(touristId)
        return {
            statusCode: 200,
            message: 'get history success',
            data: result
        }
    }
}