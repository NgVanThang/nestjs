import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { PrismaService } from './../prisma/prisma.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        PrismaService,
        JwtService,
        ConfigService,
        JwtStrategy
    ]
})
export class AuthModule {

}