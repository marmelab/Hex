import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GameState } from '../common/gameState';
import { User } from '../users/user.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  player1: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  player2: User;

  @Column('simple-json')
  state: GameState;
}
