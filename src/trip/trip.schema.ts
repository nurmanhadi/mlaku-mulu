import { $Enums } from "@prisma/client"

export class TripResponse {
    id: number
    touristId: string
    startDate: Date
    endDate: Date
    status: $Enums.TripStatus
    createdAt: Date
    updatedAt: Date
}