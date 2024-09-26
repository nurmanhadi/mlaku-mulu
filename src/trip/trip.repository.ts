import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { CreateTripDto, UpdateTripDto } from "./trip.dto";
import { Trip } from "@prisma/client";

@Injectable()
export class TripRepository{
    constructor(private prismaService: PrismaService){}

    countTrip(id: number): Promise<number> {
        return this.prismaService.trip.count({
            where:{
                id: id
            }
        })
    }

    async totalCount(): Promise<number> {
        return this.prismaService.trip.count()
    }

    async findManyTrips(page:number, perPage: number): Promise<Trip[]> {
        const skip = (page - 1) * perPage
        return this.prismaService.trip.findMany({
            skip: skip,
            take: perPage
        })
    }

    async findTripById(tripId: number): Promise<Trip> {
        return this.prismaService.trip.findUnique({
            where:{
                id: tripId
            },
            include:{
                destinations: true
            }
        })
    }
    async findTripByTouristId(touristId: string): Promise<Trip[]> {
        return this.prismaService.trip.findMany({
            where:{
                touristId: touristId
            },
            include:{
                destinations: true
            }
        })
    }

    async createTrip(req: CreateTripDto): Promise<Trip> {
        return this.prismaService.trip.create({
            data: req
        })
    }

    async updateTrip(tripId: number, req: UpdateTripDto): Promise<Trip> {
        return this.prismaService.trip.update({
            where:{
                id: tripId
            },
            data: req
        })
    }

    async deleteTrip(tripId: number,) {
        return this.prismaService.trip.delete({
            where:{
                id: tripId
            }
        })
    }
}