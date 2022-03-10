import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Game } from './game.entity';

@EventSubscriber()
export class GamesSubscriber implements EntitySubscriberInterface<Game> {
  constructor(
    connection: Connection,
    private readonly userService: UsersService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Game;
  }

  afterInsert(event: InsertEvent<Game>): void | Promise<any> {
    this.userService.incrementNbGames(event.entity.player1.id);
  }

  afterUpdate(event: UpdateEvent<Game>): void | Promise<any> {
    if (
      event.updatedRelations.some((x) => x.propertyName == 'player2') &&
      event.entity.player2 &&
      event.entity.player2.id
    ) {
      this.userService.incrementNbGames(event.entity.player2.id);
    }
  }
}
