import expect from 'expect';
import {
  arrayBoardToBinaryBoard,
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
    });
  });
});
