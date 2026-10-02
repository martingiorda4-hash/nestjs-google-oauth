import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';


import { AuthModule } from './auth/authModule';
import { UsersModule } from './users/usersModule';
import { DatabaseModule } from './database/databaseModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
