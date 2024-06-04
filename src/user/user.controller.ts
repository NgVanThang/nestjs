import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get()
    me(@Req() request) {
        return request.user;
    }
}