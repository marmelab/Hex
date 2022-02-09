import expect from "expect";
import { GameState } from "./gamestate";
import { playerHasWon } from "./pathfinding";

describe("check whether player has won the game", () => {
    it("should say WIN with a 3x3 board with a vertical path", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(true);
    });

    it("should say WIN with a 3x3 board with an horizontal path", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }],
                [{ value: "black" }, { value: "black" }, { value: "black" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(true);
    });

    it("should NOT say WIN with a 3x3 board with a first diagonal", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "black" }, { value: "empty" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "black" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(false);
    });

    it("should say WIN with a 3x3 board with an anti diagonal", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "empty" }, { value: "empty" }, { value: "black" }],
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "black" }, { value: "empty" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(true);
    });

    it("should NOT say WIN with a 3x3 board with an incomplete vertical path", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(false);
    });

    it("should say WIN with this 5x5 board with a continuous line", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "empty" }, { value: "black" }, { value: "empty" }, { value: "empty" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "black" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "black" }, { value: "black" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "black" }, { value: "empty" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(true);
    });

    it("should NOT say WIN with this 5x5 board with a non continuous line", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "black" }, { value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "black" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "black" }, { value: "black" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "black" }, { value: "empty" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(false);
    });

    it("should say WIN with this 5x5 board with a Z", () => {
        // given
        const input: GameState = {
            board: [
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "empty" }],
                [{ value: "black" }, { value: "black" }, { value: "black" }, { value: "black" }, { value: "empty" }],
                [{ value: "empty" }, { value: "empty" }, { value: "black" }, { value: "empty" }, { value: "empty" }],
                [{ value: "empty" }, { value: "black" }, { value: "black" }, { value: "black" }, { value: "black" }],
                [{ value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "empty" }, { value: "empty" }],
            ],
        };
        // when
        const ouput = playerHasWon(input);
        // then
        expect(ouput).toStrictEqual(true);
    });
});
