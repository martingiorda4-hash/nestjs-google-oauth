import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

interface AuthenticatedRequest extends Request{
    user: {
        jwt: string,
    };
}

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
    // Guarda la redirección automática a Google
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    // req.user contiene el JWT o el usuario generado por AuthService
    const token = req.user.jwt;
    
    //Opción A: Responder con el token JSON
    return res.status(200).json({ token });
    
    // Opción B (Recomendada para Frontend): Redirigir enviando el token por query param o cookie
        //return res.redirect(`http://localhost:4200/login-success?token=${token}`);
    } 
}
