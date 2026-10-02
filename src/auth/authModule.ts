import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './authController';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { User } from '../users/user.entity';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret',
            signOptions: {
                expiresIn: '1d',
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy],
    exports: [AuthService],
})
export class AuthModule {}