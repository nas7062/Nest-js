import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { BoardsRepository } from './boards/boards.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule,
    TypeOrmModule.forFeature([BoardsRepository]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class AppModule {}
