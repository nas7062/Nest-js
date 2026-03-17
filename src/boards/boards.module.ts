import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BoardsService],
  controllers: [BoardsController],
  imports: [AuthModule]
})
export class BoardsModule { }
