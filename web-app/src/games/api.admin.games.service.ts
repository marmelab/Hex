import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { Game } from './game.entity';

export type SortOrder = 'ASC' | 'DESC';

export interface GamesSortColumn {
  column: 'id' | 'player1' | 'player2' | 'createdAt' | 'updatedAt';
  order: SortOrder;
}

export interface GamesFilter {
  column: 'id' | 'player1' | 'player2' | 'status';
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

  findMany(searchParams?: GamesSearchParams): Promise<Game[]> {
    const findOptions: FindManyOptions<Game> = {};
    if (searchParams) {
      if (searchParams.sort) {
        findOptions.order = this.convertToFindOptionsOrder(searchParams.sort);
      }
      if (searchParams.filter) {
        findOptions.where = this.convertToFindOptionsWhere(searchParams.filter);
      }
      if (searchParams.skip) findOptions.skip = searchParams.skip;
      if (searchParams.take) findOptions.take = searchParams.take;
    }
    return this.gamesRepository.find(findOptions);
  }

  deleteOne(id: number) {
    return this.gamesRepository.delete(id);
  }

  deleteMany(ids: number[]) {
    if (!ids) {
      throw Error('A list of ids must be provided to delete games');
    }
    return this.gamesRepository.delete(ids);
  }

  convertToFindOptionsOrder(sort: GamesSortColumn[]): GameOrderType {
    const order: GameOrderType = {};
    sort.forEach((s) => {
      switch (s.column) {
        case 'createdAt':
          order.createdAt = s.order;
          break;
        case 'updatedAt':
          order.updatedAt = s.order;
          break;
        case 'id':
          order.id = s.order;
          break;
        case 'player1':
          order.player1 = s.order;
          break;
        case 'player2':
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
        case 'id':
          where.id = f.value;
          break;
        case 'player1':
          where.player1 = f.value;
          break;
        case 'player2':
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
