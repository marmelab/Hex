import expect from 'expect';
import {
  GameState,
  playerHasWon,
  initNewGameState,
  updateGameState,
  getNextMoveHint,
  NextMoveHint,
} from './gameState';
import { parseGameStateFromMultilineString } from './utils';

describe('check whether player has won the game', () => {
  it('should say WIN for white with a 3x3 board with a vertical path', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡
 ⬡ W ⬡
  ⬡ W ⬡
        `);
    // when
    const ouputWhite = playerHasWon(input, 'white');
    // then
    expect(ouputWhite.hasWon).toStrictEqual(true);
  });

  it('should say WIN for black with a 3x3 board with an horizontal path', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬡ ⬡
 ⬢ ⬢ ⬢
  ⬡ ⬡ ⬡
        `);
    // when
    const ouputBlack = playerHasWon(input, 'black');
    // then
    expect(ouputBlack.hasWon).toStrictEqual(true);
  });

  it('should NOT say WIN for black nor white with a 3x3 board with a first diagonal', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬢ ⬡ ⬡
 ⬡ ⬢ ⬡
  ⬡ ⬡ ⬢
        `);
    // when
    const outputBlack = playerHasWon(input, 'black');
    const outputWhite = playerHasWon(input, 'white');
    // then
    expect(outputBlack.hasWon && outputWhite.hasWon).toStrictEqual(false);
  });

  it('should say WIN for white with a 3x3 board with an anti diagonal', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬡ W
 ⬡ W ⬡
  W ⬡ ⬡
        `);
    // when
    const outputWhite = playerHasWon(input, 'white');
    // then
    expect(outputWhite.hasWon).toStrictEqual(true);
  });

  it('should NOT say WIN for black nor white with a 3x3 board with an incomplete vertical path', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬢ ⬡
 ⬡ ⬢ ⬡
  ⬡ ⬡ ⬡
        `);
    // when
    const outputBlack = playerHasWon(input, 'black');
    const outputWhite = playerHasWon(input, 'white');
    // then
    expect(outputBlack.hasWon && outputWhite.hasWon).toStrictEqual(false);
  });

  it('should say WIN for white with this 5x5 board with a continuous line', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W W W ⬡
  ⬡ ⬡ ⬡ W W
   ⬡ ⬡ ⬡ W ⬡
    ⬡ ⬡ W ⬡ ⬡
        `);
    // when
    const outputWhite = playerHasWon(input, 'white');
    // then
    expect(outputWhite.hasWon).toStrictEqual(true);
  });

  it('should NOT say WIN for black nor white with this 5x5 board with a non continuous line', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬢ ⬡ ⬡ ⬡ ⬡
 ⬡ ⬢ ⬢ ⬢ ⬡
  ⬡ ⬡ ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡ ⬢ ⬡
    ⬡ ⬡ ⬢ ⬡ ⬡
        `);
    // when
    const outputBlack = playerHasWon(input, 'black');
    const outputWhite = playerHasWon(input, 'white');
    // then
    expect(outputBlack.hasWon && outputWhite.hasWon).toStrictEqual(false);
  });

  it('should say WIN for black with this 5x5 board with a Z', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬡ ⬡ ⬡ ⬡
 ⬢ ⬢ ⬢ ⬢ ⬡
  ⬡ ⬡ ⬢ ⬡ ⬡
   ⬡ ⬢ ⬢ ⬢ ⬢
    ⬡ ⬡ ⬡ ⬡ ⬡
        `);
    // when
    const outputBlack = playerHasWon(input, 'black');
    // then
    expect(outputBlack.hasWon).toStrictEqual(true);
  });
});

describe('Init a new board from scratch', () => {
  it('Should return a game state object with a board of size 4x4 full of empty values', () => {
    const generatedBoard = initNewGameState(4);

    expect(generatedBoard).toEqual({
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
      ],
    });
  });
  it('Should return an empty board', () => {
    const generatedBoard = initNewGameState(0);

    expect(generatedBoard).toEqual({
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [],
    });
  });
});

describe('Update game state based on a user action', () => {
  it('Should throw an error if board is empty', () => {
    const emptyGameState: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [],
    };
    const coordinates = { x: 1, y: 1 };

    const updateGameStateCall = () => {
      updateGameState(emptyGameState, coordinates);
    };

    expect(updateGameStateCall).toThrowError();
  });
  it("Should throw an error if coordinates isn't in board", () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [[{ value: 'empty' }, { value: 'empty' }]],
    };
    const outsideBoardCoordinates = { x: 999, y: 999 };

    const updateGameStateCall = () => {
      updateGameState(gamestate, outsideBoardCoordinates);
    };

    expect(updateGameStateCall).toThrowError();
  });
  it('Should throw an error if the cell already have a stone', () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [[{ value: 'black' }]],
    };
    const coordinatesWithAStoneOnCell = { x: 0, y: 0 };

    const updateGameStateCall = () => {
      updateGameState(gamestate, coordinatesWithAStoneOnCell);
    };

    expect(updateGameStateCall).toThrowError();
  });
  it('Should get a board with a black stone in the up left cell', () => {
    const gamestate: GameState = {
      turn: 'black',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'empty' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'black' }],
      ],
    };
    const topLeftCoords = { x: 0, y: 0 };

    const updatedGameState = updateGameState(gamestate, topLeftCoords);

    expect(updatedGameState).toEqual({
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'black' }],
      ],
    });
  });
  it('Should get a board with a white stone in the bottom right cell', () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'empty' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }],
      ],
    };
    const bottomRightCoords = { x: 2, y: 2 };

    const updatedGameState = updateGameState(gamestate, bottomRightCoords);

    expect(updatedGameState).toEqual({
      turn: 'black',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'empty' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'black' }, { value: 'empty' }, { value: 'white' }],
      ],
    });
  });
  it('Should give a winner if a player make a winning move', () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'white' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    };
    const winningCoords = { x: 0, y: 2 };

    const updatedGameState = updateGameState(gamestate, winningCoords);

    expect(updatedGameState).toEqual({
      turn: 'black',
      winner: 'white',
      winningPath: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      board: [
        [{ value: 'white' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'empty' }],
      ],
    });
  });
  it('Should not give a winner if a player make a winning move', () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'white' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'empty' }, { value: 'white' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    };
    const winningCoords = { x: 0, y: 2 };

    const updatedGameState = updateGameState(gamestate, winningCoords);

    expect(updatedGameState).toEqual({
      turn: 'black',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'white' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'empty' }, { value: 'white' }, { value: 'empty' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'empty' }],
      ],
    });
  });
});

describe('Get a hint about the next move', () => {
  it('Should reply WON if I already won the game', () => {
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W ⬡ W ⬡
  ⬡ ⬡ ⬢ ⬢ ⬡
   ⬢ ⬢ ⬡ ⬢ ⬡
    ⬡ W ⬡ ⬢ ⬢
        `);

    const output = getNextMoveHint(input, 'black');

    const expected: NextMoveHint = {
      closenessToGameEnd: 'WON',
    };
    expect(output).toStrictEqual(expected);
  });

  it('Should reply LOST if my opponent has already won the game', () => {
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W ⬡ W ⬡
  ⬡ ⬡ ⬢ ⬢ ⬡
   ⬢ ⬢ ⬡ ⬢ ⬡
    ⬡ W ⬡ ⬢ ⬢
        `);

    const output = getNextMoveHint(input, 'white');

    const expected: NextMoveHint = {
      closenessToGameEnd: 'LOST',
    };
    expect(output).toStrictEqual(expected);
  });

  it('Should reply ONE_MOVE_TO_WIN if I am black in this situation', () => {
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W ⬡ W ⬡
  ⬡ ⬡ ⬢ ⬡ ⬡
   ⬢ ⬢ ⬡ ⬢ ⬡
    ⬡ W ⬡ ⬢ ⬢
        `);

    const output = getNextMoveHint(input, 'black');

    const expected: NextMoveHint = {
      closenessToGameEnd: 'ONE_MOVE_TO_WIN',
      suggestedNextMove: { x: 3, y: 2 },
    };
    expect(output).toStrictEqual(expected);
  });

  it('Should reply ONE_MOVE_TO_LOOSE if I am white in this situation', () => {
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W ⬡ W ⬡
  ⬡ ⬡ ⬢ ⬡ ⬡
   ⬢ ⬢ ⬡ ⬢ ⬡
    ⬡ W ⬡ ⬢ ⬢
        `);

    const output = getNextMoveHint(input, 'white');

    const expected: NextMoveHint = {
      closenessToGameEnd: 'ONE_MOVE_TO_LOOSE',
      suggestedNextMove: { x: 3, y: 2 },
    };
    expect(output).toStrictEqual(expected);
  });

  it('Should reply UNDETERMINED if I am black in this situation', () => {
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W ⬡ W ⬡
  ⬡ ⬡ ⬢ ⬡ ⬡
   ⬢ ⬡ ⬡ ⬡ ⬡
    ⬡ W ⬡ ⬢ ⬢
        `);

    const output = getNextMoveHint(input, 'black');

    const expected: NextMoveHint = {
      closenessToGameEnd: 'UNDETERMINED',
    };
    expect(output).toStrictEqual(expected);
  });

  it('Should reply UNDETERMINED if I am white in this situation', () => {
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬡ ⬡
 ⬡ W ⬡ W ⬡
  ⬡ ⬡ ⬢ ⬡ ⬡
   ⬢ ⬡ ⬡ ⬡ ⬡
    ⬡ W ⬡ ⬢ ⬢
        `);

    const output = getNextMoveHint(input, 'white');

    const expected: NextMoveHint = {
      closenessToGameEnd: 'UNDETERMINED',
    };
    expect(output).toStrictEqual(expected);
  });
});
