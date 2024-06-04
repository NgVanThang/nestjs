import { AuthService } from './auth.service';
import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDTO, LoginUserDTO } from './dtos';

@Controller()
export class AuthController {
    constructor(private readonly AuthService: AuthService) {

    }

    @Post('register')
    register(@Body() body: CreateUserDTO) {
        return this.AuthService.register(body);
    }

    @Post('login')
    login(@Body() body: LoginUserDTO) {
        return this.AuthService.login(body);
    }
}