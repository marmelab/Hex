import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { GameState } from '../common/gameState';
import { User } from './user.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  player1: User;

  @OneToOne(() => User)
  @JoinColumn()
  player2: User;

  @Column('simple-json')
  state: GameState;
}
