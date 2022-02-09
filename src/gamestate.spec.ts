import expect from "expect";
import { GameState, playerHasWon, generateNewBoard, updateGameState } from "./gamestate";

function parseGameStateFromMultilineString(gameState: string): GameState {
  return {
    board: gameState.split(/\r?\n/)
      .filter(line => line.replace(/ /g, '').length > 0)
      .map(line => line.replace(/ /g, '').split('')
        .map(cell => {
          switch (cell) {
            case "⬢":
              return { value: "black" };
            default:
              return { value: "empty" };
          }
        }))
  };
}

describe("check whether player has won the game", () => {
  it("should say WIN with a 3x3 board with a vertical path", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬢ ⬡
 ⬡ ⬢ ⬡
  ⬡ ⬢ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(true);
  });

  it("should say WIN with a 3x3 board with an horizontal path", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬡ ⬡
 ⬢ ⬢ ⬢
  ⬡ ⬡ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(true);
  });

  it("should NOT say WIN with a 3x3 board with a first diagonal", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬢ ⬡ ⬡
 ⬡ ⬢ ⬡
  ⬡ ⬡ ⬢
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(false);
  });

  it("should say WIN with a 3x3 board with an anti diagonal", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬡ ⬢
 ⬡ ⬢ ⬡
  ⬢ ⬡ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(true);
  });

  it("should NOT say WIN with a 3x3 board with an incomplete vertical path", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬢ ⬡
 ⬡ ⬢ ⬡
  ⬡ ⬡ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(false);
  });

  it("should say WIN with this 5x5 board with a continuous line", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬢ ⬡ ⬡ ⬡
 ⬡ ⬢ ⬢ ⬢ ⬡
  ⬡ ⬡ ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡ ⬢ ⬡
    ⬡ ⬡ ⬢ ⬡ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(true);
  });

  it("should NOT say WIN with this 5x5 board with a non continuous line", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬢ ⬡ ⬡ ⬡ ⬡
 ⬡ ⬢ ⬢ ⬢ ⬡
  ⬡ ⬡ ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡ ⬢ ⬡
    ⬡ ⬡ ⬢ ⬡ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(false);
  });

  it("should say WIN with this 5x5 board with a Z", () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ ⬡ ⬡ ⬡ ⬡
 ⬢ ⬢ ⬢ ⬢ ⬡
  ⬡ ⬡ ⬢ ⬡ ⬡
   ⬡ ⬢ ⬢ ⬢ ⬢
    ⬡ ⬡ ⬡ ⬡ ⬡
        `);
    // when
    const ouput = playerHasWon(input);
    // then
    expect(ouput).toStrictEqual(true);
  });
});

describe("Init a new board from scratch", () => {
  it("Should return a game state object with a board of size 4x4 full of empty values", () => {
    const generatedBoard = generateNewBoard();

    expect(generatedBoard).toEqual({
      board: [
        [
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
        ],
        [
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
        ],
        [
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
        ],
        [
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
        ],
      ],
    });
  });
});

describe("Update game state based on a user action", () => {
  it("Should throw an error if board is empty", () => {
    const emptyGameState: GameState = {
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
      board: [[{ value: "empty" }, { value: "empty" }]],
    };
    const outsideBoardCoordinates = { x: 999, y: 999 };

    const updateGameStateCall = () => {
      updateGameState(gamestate, outsideBoardCoordinates);
    };

    expect(updateGameStateCall).toThrowError();
  });
  it("Should throw an error if the cell already have a stone", () => {
    const gamestate: GameState = {
      board: [[{ value: "black" }]],
    };
    const coordinatesWithAStoneOnCell = { x: 0, y: 0 };

    const updateGameStateCall = () => {
      updateGameState(gamestate, coordinatesWithAStoneOnCell);
    };

    expect(updateGameStateCall).toThrowError();
  });
  it("Should get a board with a stone in the up left cell", () => {
    const gamestate: GameState = {
      board: [
        [{ value: "empty" }, { value: "empty" }, { value: "black" }],
        [{ value: "black" }, { value: "empty" }, { value: "empty" }],
        [{ value: "black" }, { value: "empty" }, { value: "black" }],
      ],
    };
    const topLeftCoords = { x: 0, y: 0 };

    const updatedGameState = updateGameState(gamestate, topLeftCoords);

    expect(updatedGameState).toEqual({
      board: [
        [{ value: "black" }, { value: "empty" }, { value: "black" }],
        [{ value: "black" }, { value: "empty" }, { value: "empty" }],
        [{ value: "black" }, { value: "empty" }, { value: "black" }],
      ],
    });
  });
  it("Should get a board with a stone in the bottom right cell", () => {
    const gamestate: GameState = {
      board: [
        [{ value: "empty" }, { value: "empty" }, { value: "black" }],
        [{ value: "black" }, { value: "empty" }, { value: "empty" }],
        [{ value: "black" }, { value: "empty" }, { value: "empty" }],
      ],
    };
    const bottomRightCoords = { x: 2, y: 2 };

    const updatedGameState = updateGameState(gamestate, bottomRightCoords);

    expect(updatedGameState).toEqual({
      board: [
        [{ value: "empty" }, { value: "empty" }, { value: "black" }],
        [{ value: "black" }, { value: "empty" }, { value: "empty" }],
        [{ value: "black" }, { value: "empty" }, { value: "black" }],
      ],
    });
  });
});
