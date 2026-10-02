import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

interface GoogleUserData{
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    async ValidateGoogleUser(userData: GoogleUserData){
        try{

            let user = await this.userRepository.findOne({
                where: {googleId: userData.googleId},
            });
    
            if(user){
                const payload = {
                    sub: user.id,
                    email: user.email,
                };
    
                return{
                    user,
                    access_token: this.jwtService.sign(payload),
                };
            }
    
            user = await this.userRepository.findOne({
                where: {email: userData.email},
            });
    
            if(user){
                user.googleId = userData.googleId;
                user.picture = userData.picture;
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
    
                await this.userRepository.save(user);
            }else{
                user = this.userRepository.create({
                    googleId: userData.googleId,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    picture: userData.picture,
                });
                await this.userRepository.save(user);
            }
    
            const payload = {
                sub: user.id,
                email: user.email,
            };
    
            const token = this.jwtService.sign(payload);
            return{
                user,
                access_token: token,
            };
        }catch(error){
            throw new InternalServerErrorException(
                'Error al procesar la autenticación de google',
            );
        }
    }
}