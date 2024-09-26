import { IsEmail, IsNotEmpty, MaxLength } from "class-validator"

export class RegisterAdminDto {
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string

    @IsNotEmpty()
    @MaxLength(100)
    password: string
}
export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string

    @IsNotEmpty()
    @MaxLength(100)
    password: string
}
