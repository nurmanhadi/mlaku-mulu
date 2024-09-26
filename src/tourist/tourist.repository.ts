import { Injectable } from "@nestjs/common";
import { Tourist } from "@prisma/client";
import { PrismaService } from "src/configs/prisma.service";
import { CreateTouristDto, UpdateTouristDto } from "./tourist.dto";

@Injectable()
export class TouristRepository {
    constructor(private prismaService: PrismaService){}

    async existEmail(email: string): Promise<number> {
        return this.prismaService.tourist.count({
            where:{
                email: email
            }
        })
    }
    async existPasportNumber(pasportNumber: string): Promise<number> {
        return this.prismaService.tourist.count({
            where:{
                passportNumber: pasportNumber
            }
        })
    }
    async existPhone(phone: string): Promise<number> {
        return this.prismaService.tourist.count({
            where:{
                phone: phone
            }
        })
    }

    async totalCount(): Promise<number> {
        return this.prismaService.tourist.count()
    }

    async findAll(page: number, perPage: number): Promise<Tourist[]> {
        const skip = (page - 1) * perPage
        return this.prismaService.tourist.findMany({
            skip: skip,
            take: perPage
        })
    }

    async findTouristById(touristId: string) {
        return this.prismaService.tourist.findUnique({
            where:{
                id: touristId
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                passportNumber: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
                trips: {
                    include: {
                        destinations: true
                    }
                }
            }
        })
    }

    async findById(id: string): Promise<Tourist> {
        return this.prismaService.tourist.findUnique({
            where:{
                id: id
            }
        })
    }

    async createTourist(req: CreateTouristDto): Promise<Tourist> {
        return this.prismaService.tourist.create({
            data: req
        })
    }

    async updateTourist(id: string, req: UpdateTouristDto): Promise<Tourist> {
        return this.prismaService.tourist.update({
            where:{
                id: id
            },
            data: req
        })
    }

    async deleteTourist(id: string) {
        return this.prismaService.tourist.delete({
            where:{
                id: id
            }
        })
    }
}