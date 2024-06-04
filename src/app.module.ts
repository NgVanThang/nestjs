import { CategoryModule } from './category/category.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    CategoryModule,
    UserModule,
    PrismaModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule { }
