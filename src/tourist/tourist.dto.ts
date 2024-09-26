import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TouristIdDto {
  @IsNotEmpty()
  @MinLength(36)
  touristId: string;
}

export class CreateTouristDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @MaxLength(100)
  passportNumber: string;

  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsOptional()
  address?: string;
}
export class UpdateTouristDto {
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @MaxLength(100)
  @IsEmail()
  email?: string;

  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  address?: string;
}
