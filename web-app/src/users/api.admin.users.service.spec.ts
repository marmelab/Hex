import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  ApiAdminUsersService,
  UsersFilter,
  UsersSortColumn,
} from './api.admin.users.service';

let mockedUser: User;

const mockUserRepository = {
  findOne: (_id: number): Promise<User> => {
    return new Promise((resolve, _reject) => {
      resolve(mockedUser);
    });
  },
  save: (user: User): User => {
    return user;
  },
  create: (user: User): User => {
    return user;
  },
};

describe('ApiAdminUserService', () => {
  let userService: ApiAdminUsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ApiAdminUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = app.get<ApiAdminUsersService>(ApiAdminUsersService);
  });

  it('should convert an array of sort columns to a typeorm order type"', () => {
    const sort: UsersSortColumn[] = [
      {
        column: 'createdAt',
        order: 'DESC',
      },
      {
        column: 'id',
        order: 'ASC',
      },
      {
        column: 'username',
        order: 'DESC',
      },
    ];
    expect(userService.convertToFindOptionsOrder(sort)).toEqual({
      createdAt: 'DESC',
      id: 'ASC',
      username: 'DESC',
    });
  });

  it('should convert an array of filters to a typeorm where type"', () => {
    const filter: UsersFilter[] = [
      {
        column: 'username',
        value: 'john',
      },
      {
        column: 'id',
        value: 1,
      },
    ];
    expect(userService.convertToFindOptionsWhere(filter)).toEqual({
      username: 'john',
      id: 1,
    });
  });
});
