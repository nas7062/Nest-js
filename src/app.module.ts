import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule,
    AuthModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [BoardsController],
  providers: [BoardsService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AppModule { }
