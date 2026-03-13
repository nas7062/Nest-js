import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';


@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {
  }

  // @Get("/")
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto)
  // }

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
