import expect from 'expect';
import {
  arrayBoardToBinaryBoard,
  binaryBoardToArrayBoard,
  parseGameStateFromMultilineString,
} from './utils';

describe('convert an array representation of the board to a binary one', () => {
  it('should convert this 3x3 array board into its binary representation', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡
 ⬢ W ⬡
  ⬢ W ⬢
        `).board;
    // when
    const ouput = arrayBoardToBinaryBoard(input);
    // then
    expect(ouput).toStrictEqual({
      whiteBoard: 0b010010010,
      blackBoard: 0b000100101,
      boardSize: 3,
    });
  });

  it('should convert this 3x3 array board with only black stones into its binary representation', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬢ ⬢ ⬢
 ⬢ ⬢ ⬢
  ⬢ ⬢ ⬢
        `).board;
    // when
    const ouput = arrayBoardToBinaryBoard(input);
    // then
    expect(ouput).toStrictEqual({
      whiteBoard: 0b000000000,
      blackBoard: 0b111111111,
      boardSize: 3,
    });
  });

  it('should convert this 3x3 array board with only white stones into its binary representation', () => {
    // given
    const input = parseGameStateFromMultilineString(`
W W W
 W W W
  W W W
        `).board;
    // when
    const ouput = arrayBoardToBinaryBoard(input);
    // then
    expect(ouput).toStrictEqual({
      whiteBoard: 0b111111111,
      blackBoard: 0b000000000,
      boardSize: 3,
    });
  });

  it('should convert this 5x5 array board into its binary representation', () => {
    // given
    const input = parseGameStateFromMultilineString(`
⬡ W ⬡ ⬢ ⬡
 ⬢ W ⬡ ⬡ ⬡
  ⬢ W ⬢ W W
   ⬡ ⬡ ⬡ ⬡ W
    ⬢ ⬡ ⬡ ⬡ ⬢
        `).board;
    // when
    const ouput = arrayBoardToBinaryBoard(input);
    // then
    expect(ouput).toStrictEqual({
      whiteBoard: 0b0100001000010110000100000,
      blackBoard: 0b0001010000101000000010001,
      boardSize: 5,
    });
  });
});

describe('convert a binary representation of the board to an array', () => {
  it('should convert this 3x3 binary board into its array representation', () => {
    // given
    const input = {
      whiteBoard: 0b010010010,
      blackBoard: 0b000100101,
      boardSize: 3,
    };
    // when
    const ouput = binaryBoardToArrayBoard(input);
    // then
    expect(ouput).toStrictEqual(
      parseGameStateFromMultilineString(`
⬡ W ⬡
 ⬢ W ⬡
  ⬢ W ⬢
        `).board,
    );
  });

  it('should convert this 3x3 binary board with only black stones into its array representation', () => {
    // given
    const input = {
      whiteBoard: 0b000000000,
      blackBoard: 0b111111111,
      boardSize: 3,
    };
    // when
    const ouput = binaryBoardToArrayBoard(input);
    // then
    expect(ouput).toStrictEqual(
      parseGameStateFromMultilineString(`
⬢ ⬢ ⬢
 ⬢ ⬢ ⬢
  ⬢ ⬢ ⬢
        `).board,
    );
  });

  it('should convert this 3x3 binary board with only white stones into its array representation', () => {
    // given
    const input = {
      whiteBoard: 0b111111111,
      blackBoard: 0b000000000,
      boardSize: 3,
    };
    // when
    const ouput = binaryBoardToArrayBoard(input);
    // then
    expect(ouput).toStrictEqual(
      parseGameStateFromMultilineString(`
W W W
 W W W
  W W W
        `).board,
    );
  });

  it('should convert this 5x5 binary board into its array representation', () => {
    // given
    const input = {
      whiteBoard: 0b0100001000010110000100000,
      blackBoard: 0b0001010000101000000010001,
      boardSize: 5,
    };
    // when
    const ouput = binaryBoardToArrayBoard(input);
    // then
    expect(ouput).toStrictEqual(
      parseGameStateFromMultilineString(`
⬡ W ⬡ ⬢ ⬡
 ⬢ W ⬡ ⬡ ⬡
  ⬢ W ⬢ W W
   ⬡ ⬡ ⬡ ⬡ W
    ⬢ ⬡ ⬡ ⬡ ⬢
        `).board,
    );
  });
});
