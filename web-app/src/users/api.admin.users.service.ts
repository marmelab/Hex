import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import type { SortOrder } from '../nest-common/types';

export interface UsersSortColumn {
  column: 'id' | 'username' | 'createdAt' | 'updatedAt' | 'nbGames';
  order: SortOrder;
}

export interface UsersFilter {
  column: 'id' | 'username' | 'nbGames';
  value: any;
}

export interface UsersSearchParams {
  sort?: UsersSortColumn[];
  filter?: UsersFilter[];
  skip?: number;
  take?: number;
}

type UsersOrderType = {
  [P in EntityFieldsNames<User>]?: 'ASC' | 'DESC';
};

type UsersWhereType = FindConditions<User>;

@Injectable()
export class ApiAdminUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findMany(
    searchParams?: UsersSearchParams,
  ): Promise<{ data: User[]; total: number }> {
    const findOptions: FindManyOptions<User> = {};
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
    const [result, total] = await this.usersRepository.findAndCount(
      findOptions,
    );
    return {
      data: result,
      total,
    };
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  convertToFindOptionsOrder(sorts: UsersSortColumn[]): UsersOrderType {
    const order: UsersOrderType = {};
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
        case 'username':
          order.username = sort.order;
          break;
        case 'nbGames':
          order.nbGames = sort.order;
          break;
      }
    });
    return order;
  }

  convertToFindOptionsWhere(filters: UsersFilter[]): UsersWhereType {
    const where: UsersWhereType = {};
    filters.forEach((filter) => {
      switch (filter.column) {
        case 'id':
          where.id = filter.value;
          break;
        case 'username':
          where.username = filter.value;
          break;
        case 'nbGames':
          where.nbGames = filter.value;
          break;
      }
    });
    return where;
  }
}
