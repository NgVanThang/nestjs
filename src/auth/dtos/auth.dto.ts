import { IsEmail, IsNotEmpty } from "class-validator";
import { IsSameAs } from '../decorator';

export class CreateUserDTO {
    @IsEmail({}, { 'message': 'Email không đúng định dạng' })
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    readonly password: string

    @IsNotEmpty()
    @IsSameAs('password', { 'message': 'Mật khẩu nhắc lại không đúng' })
    readonly password_confirmation: string

    @IsNotEmpty()
    readonly name: string
}

export class UpdateUserDTO {

}

export class LoginUserDTO {
    @IsNotEmpty({ 'message': 'Email không thể để trống' })
    @IsEmail({}, { 'message': 'Email không đúng định dạng' })
    readonly email: string

    @IsNotEmpty({ 'message': 'Mật khẩu không thể để trống' })
    readonly password: string
}