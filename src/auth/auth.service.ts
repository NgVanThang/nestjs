import { ConfigService } from '@nestjs/config';
import { CreateUserDTO, LoginUserDTO } from './dtos';
import { Injectable, ConflictException, ForbiddenException } from "@nestjs/common";
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
   ) { }

   register = async (AuthDTO: CreateUserDTO) => {
      const hashPassword = await argon.hash(AuthDTO.password);
      try {
         // Tạo một bản ghi mới trong cơ sở dữ liệu với thông tin của AuthDTO
         const createdAuth = await this.prisma.user.create({
            data: {
               email: AuthDTO.email,
               hashedPassword: hashPassword,
               name: AuthDTO.name
               // Các trường thông tin khác của AuthDTO nếu cần
            },
         });

         // Trả về thông tin của Auth vừa tạo
         return await this.signJwtToken(createdAuth.id, createdAuth.email);
      } catch (error) {
         // Xử lý lỗi nếu xảy ra lỗi tạo bản ghi
         if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new ConflictException('Email đã tồn tại'); // Ném ra ngoại lệ nếu email đã tồn tại trong cơ sở dữ liệu
         } else {
            throw error; // Ném ra lỗi khác nếu xảy ra lỗi không mong muốn
         }
      }
   }

   login = async (AuthDTO: LoginUserDTO) => {
      const user = await this.prisma.user.findUnique({
         where: {
            email: AuthDTO.email
         }
      })

      console.log(user);

      if (!!!user) {
         throw new ForbiddenException('Email hoặc mật khẩu không đúng');
      }

      const passwordMatched = await argon.verify(user.hashedPassword, AuthDTO.password);

      if (!passwordMatched) {
         throw new ForbiddenException('Đăng nhập thất bại');
      }

      delete user.hashedPassword;

      return await this.signJwtToken(user.id, user.email);
   }

   signJwtToken = async (userId: number | bigint, email: string): Promise<{ accessToken: string }> => {
      const payload = {
         sub: userId,
         email: email
      }

      const jwtString = await this.jwtService.signAsync(payload, {
         expiresIn: '10m',
         secret: this.configService.get('JWT_SECRET')
      });

      return {
         accessToken: jwtString
      }
   }
}