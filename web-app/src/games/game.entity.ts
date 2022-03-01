import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  status: 'INITIALIZED' | 'RUNNING' | 'ENDED';
}
