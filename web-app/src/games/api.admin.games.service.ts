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

  async findMany(
    searchParams?: GamesSearchParams,
  ): Promise<{ data: Game[]; total: number }> {
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
    const [result, total] = await this.gamesRepository.findAndCount(
      findOptions,
    );
    return {
      data: result,
      total,
    };
  }

  deleteOne(id: number) {
    return this.gamesRepository.delete(id);
  }

  deleteMany(ids: number[]) {
    if (!ids || !ids.length) {
      throw Error('A list of ids must be provided to delete games');
    }
    return this.gamesRepository.delete(ids);
  }

  convertToFindOptionsOrder(sorts: GamesSortColumn[]): GameOrderType {
    const order: GameOrderType = {};
    sorts.forEach((sort) => {
      switch (sort.column) {
        case 'createdAt':
          order.createdAt = sort.order;
          break;
        case 'updatedAt':
          order.updatedAt = sort.order;
          break;
        case 'id':
          order.id = sort.order;
          break;
        case 'player1':
          order.player1 = sort.order;
          break;
        case 'player2':
          order.player2 = sort.order;
          break;
      }
    });
    return order;
  }

  convertToFindOptionsWhere(filters: GamesFilter[]): GameWhereType {
    const where: GameWhereType = {};
    filters.forEach((filter) => {
      switch (filter.column) {
        case 'id':
          where.id = filter.value;
          break;
        case 'player1':
          where.player1 = filter.value;
          break;
        case 'player2':
          where.player2 = filter.value;
          break;
        case 'status':
          where.status = filter.value;
          break;
      }
    });
    return where;
  }
}
