import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, FindConditions } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { Game } from './game.entity';

export type SortOrder = 'ASC' | 'DESC';

export interface GamesSortColumn {
  column:
    | 'game.id'
    | 'game.player1'
    | 'game.player2'
    | 'game.createdAt'
    | 'game.updatedAt';
  order: SortOrder;
}

export interface GamesFilter {
  column: 'game.id' | 'game.player1' | 'game.player2' | 'status';
  value: any;
}

export interface GamesSearchParams {
  sort?: GamesSortColumn[];
  filter?: GamesFilter[];
  skip?: number;
  take?: number;
}

type GameOrderType = {
  [P in EntityFieldsNames<Game>]?: 'ASC' | 'DESC';
};

type GameWhereType = FindConditions<Game>;

@Injectable()
export class ApiAdminGamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  findOne(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  findMany(searchParams: GamesSearchParams): Promise<Game[]> {
    const findOptions: FindManyOptions<Game> = {};
    if (searchParams.sort) {
      findOptions.order = this.convertToFindOptionsOrder(searchParams.sort);
    }
    if (searchParams.filter) {
      findOptions.where = this.convertToFindOptionsWhere(searchParams.filter);
    }
    findOptions.skip = searchParams.skip;
    findOptions.take = searchParams.take;
    return this.gamesRepository.find(findOptions);
  }

  deleteOne(id: number) {
    return this.gamesRepository.delete(id);
  }

  deleteMany(searchParams: GamesSearchParams) {
    let where: GameWhereType = {};
    if (searchParams.filter) {
      where = this.convertToFindOptionsWhere(searchParams.filter);
    }
    return this.gamesRepository.delete(where);
  }

  convertToFindOptionsOrder(sort: GamesSortColumn[]): GameOrderType {
    const order: GameOrderType = {};
    sort.forEach((s) => {
      switch (s.column) {
        case 'game.createdAt':
          order.createdAt = s.order;
          break;
        case 'game.updatedAt':
          order.updatedAt = s.order;
          break;
        case 'game.id':
          order.id = s.order;
          break;
        case 'game.player1':
          order.player1 = s.order;
          break;
        case 'game.player2':
          order.player2 = s.order;
          break;
      }
    });
    return order;
  }

  convertToFindOptionsWhere(filter: GamesFilter[]): GameWhereType {
    const where: GameWhereType = {};
    filter.forEach((f) => {
      switch (f.column) {
        case 'game.id':
          where.id = f.value;
          break;
        case 'game.player1':
          where.player1 = f.value;
          break;
        case 'game.player2':
          where.player2 = f.value;
          break;
        case 'status':
          where.status = f.value;
          break;
      }
    });
    return where;
  }
}
