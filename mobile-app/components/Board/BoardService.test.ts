import expect from 'expect';
import { GameState } from '../../utils';
import { generateBoardCells } from "./BoardService";

describe('Generate board cells', () => {
  it("Should returns a valid number of cells", () => {
    const gameState: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }
    const nbOfCellsInGameState = Math.pow(gameState.board.length, 2);
    const nbOfBorderCellsAdded = 26;

    const nbOfGeneratedCells = generateBoardCells(gameState).length;

    expect(nbOfGeneratedCells).toBe(nbOfCellsInGameState + nbOfBorderCellsAdded);
  });
});
