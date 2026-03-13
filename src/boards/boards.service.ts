import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v4 as uuidv4 } from "uuid"
import { CreateBoardDto } from './dto/create-boards-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './boards.entity';
import { Repository } from 'typeorm';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
  ) { }
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto
    const board: Board = {
      id: uuidv4(),
      title,
      description,
      status: BoardStatus.PUBLIC
    }
    this.boards.push(board);
    return board;
  }
  getBoardById(id: string): Board {
    const board = this.boards.find(board => board.id === id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }
  deleteBoardById(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
