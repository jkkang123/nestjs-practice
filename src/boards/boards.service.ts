import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardReposirtory: BoardRepository,
  ) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardReposirtory.find();
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board = {
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //     id: uuid(),
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardReposirtory.createBoard(createBoardDto);
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardReposirtory.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  // deleteBoardById(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards.filter((board) => board.id !== found.id);
  // }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardReposirtory.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardReposirtory.save(board);
    return board;
  }
}
