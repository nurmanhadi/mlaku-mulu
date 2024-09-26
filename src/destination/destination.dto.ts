import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator"

export class CreateDesDto {
    @IsOptional()
    @IsNumber()
    tripId: number

    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @IsNotEmpty()
    @MaxLength(100)
    country: string

    @IsNotEmpty()
    @MaxLength(100)
    city: string
}

export class UpdateDesDto {
    @IsOptional()
    @MaxLength(100)
    name?: string

    @IsOptional()
    @MaxLength(100)
    country?: string

    @IsOptional()
    @MaxLength(100)
    city?: string
}