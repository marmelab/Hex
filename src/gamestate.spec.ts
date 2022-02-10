import expect from "expect";
import { GameState, playerHasWon } from "./gamestate";

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
