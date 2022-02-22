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
  it("Should returns valid data for first border cell", () => {
    const gameState: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }

    const generatedBoardCells = generateBoardCells(gameState);
    const firstBorderCell = generatedBoardCells[0];

    expect(firstBorderCell.type).toBe("player1Border");
  });
  it("Should returns valid data for last border cell", () => {
    const gameState: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }

    const generatedBoardCells = generateBoardCells(gameState);
    const lastBorderCell = generatedBoardCells[61];

    expect(lastBorderCell.type).toBe("player1Border");
  });
  it("Should returns valid data for first playable cell", () => {
    const gameState: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }

    const generatedBoardCell = generateBoardCells(gameState);
    const firstPlayableCell = generatedBoardCell[8];

    expect(firstPlayableCell.type).toBe("playable");
    expect(firstPlayableCell.withoutBorderCoordinates).toStrictEqual({ x: 0, y: 0 });
  });
  it("Should returns valid data for last playable cell", () => {
    const gameState: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }

    const generatedBoardCell = generateBoardCells(gameState);
    const lastPlayableCell = generatedBoardCell[53];

    expect(lastPlayableCell.type).toBe("playable");
    expect(lastPlayableCell.withoutBorderCoordinates).toStrictEqual({ x: 5, y: 5 });
  });
});
