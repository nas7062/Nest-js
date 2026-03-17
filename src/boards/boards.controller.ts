import { BoardsService } from './boards.service';
import { BoardEntity } from './boards.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-boards-dto';
import { BoardsStatusValidationPipe } from './pipes/boards-status-validation.pipe';
import { BoardStatus } from './boards.status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }
  @Get("/")
  getAllBoards(): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoards();
  }
  @Get("/user")
  getAllBoardsByUser(@GetUser() user: UserEntity): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoardsByUser(user);
  }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto)
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: UserEntity): Promise<BoardEntity> {
    return this.boardsService.createBoard(createBoardDto, user);
  }
  @Post()
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardsService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoardById(@Param("id", ParseIntPipe) id: number, @GetUser() user: UserEntity): void {
    this.boardsService.deleteBoardById(id, user);
  }

  @Patch("/:id/status")
  updateBoardStatus(@Param("id") id: number, @Body('status', BoardsStatusValidationPipe) status: BoardStatus) {
    return this.boardsService.updateBoardStatus(id, status);
  }
  // @Get("/:id")
  // getBoardById(@Param("id") id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  // @Delete("/:id")
  // deleteBoardById(@Param("id") id: string): void {
  //   this.boardsService.deleteBoardById(id);
  // }
  // @Patch("/:id/status")
  // updateBoardStatus(@Param("id") id: string, @Body('status', BoardsStatusValidationPipe) status: BoardStatus) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
