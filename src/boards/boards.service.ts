import { CreateBoardDto } from './dto/create-boards-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './boards.entity';
import { Repository } from 'typeorm';
import { BoardStatus } from './boards.status.enum';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
  ) { }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto
  //   const board: Board = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC
  //   }
  //   this.boards.push(board);
  //   return board;
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, description } = createBoardDto;
    const board = this.boardsRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardsRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    const found = await this.boardsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return found;
  }

  async deleteBoardById(id: number): Promise<void> {
    const found = await this.boardsRepository.delete(id);
    if (found.affected === 0) {
      throw new NotFoundException(`Board ${id} not found`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardsRepository.save(board);
    return board;
  }
  async getAllBoards(): Promise<BoardEntity[]> {
    return this.boardsRepository.find();
  }

  // getBoardById(id: string): Board {
  //   const board = this.boards.find(board => board.id === id);
  //   if (!board) {
  //     throw new NotFoundException(`Board with id ${id} not found`);
  //   }
  //   return board;
  // }
  // deleteBoardById(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
