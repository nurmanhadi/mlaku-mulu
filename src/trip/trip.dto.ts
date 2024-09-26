import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTripDto {
  @IsOptional()
  @MinLength(36)
  @IsUUID()
  touristId: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;
}

export class UpdateTripDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsEnum($Enums.TripStatus)
  status?: $Enums.TripStatus;
}
