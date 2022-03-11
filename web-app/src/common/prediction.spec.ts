import expect from 'expect';
import {
  parseGameStateFromMultilineString,
  areExpectedCoordinatesInList,
} from './utils';
import {
  getNextPlaySuggestion,
  getMinimaxNextPlaySuggestion,
} from './prediction';

describe('Get a suggestion for the next play', () => {
  it('Should get a suggestion to play on x:2,y:2 or x:2,y:1', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'black');

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 2, y: 2 },
        { x: 2, y: 1 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play between the 2 black cells on last row', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬢
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'black');

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 2 });
  });

  it('Should get a suggestion to play on first cell of last row', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'black');

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 2 });
  });

  it('Should get a suggestion to play on x:0,y:0 or x:1,y:0', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   W ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'white');
    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play between the 2 white cells on first column', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'white');

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 1 });
  });

  it('Should get a suggestion to play on first cell of last row', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   W ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'white');

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 2 });
  });

  it('Should get a suggestion to play on one from 5 possible coordinates', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ W ⬡
    ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'white');
    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play the only possible play on a almost full board', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬡ ⬢
    ⬢ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'white');

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 1 });
  });

  it('Should throw an error if the board is already full', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    expect(() => getNextPlaySuggestion(input.board, 'white')).toThrowError();
  });

  it('Should get a suggestion to play on x:3,y:1', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ ⬡ ⬡ ⬡ ⬡
     ⬡ ⬡ ⬡ ⬡ ⬡
      ⬡ ⬡ ⬢ W ⬡
       ⬡ ⬢ ⬡ W ⬡
        ⬡ ⬡ ⬡ ⬡ ⬡
    `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'white');

    expect(nextPlayAdvice).toStrictEqual({ x: 3, y: 1 });
  });

  it('Should get a suggestion to play on one from 3 possible coordinates', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ W ⬡ ⬡ ⬡
     ⬡ ⬡ ⬡ ⬡ ⬢
      W ⬡ ⬢ W ⬡
       ⬡ ⬢ ⬡ W ⬡
        ⬡ ⬡ ⬡ ⬡ ⬡
    `);

    const nextPlayAdvice = getNextPlaySuggestion(input.board, 'black');

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 3, y: 1 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
      ]),
    ).toBeTruthy();
  });
});

describe('Get a suggestion for the next play based on minimax', () => {
  it('Should get a suggestion to play at (4, 0) as WHITE on this 5x5 board with depth 3 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ ⬡ ⬡ ⬡ ⬡
     ⬡ ⬡ ⬡ ⬡ ⬡
      ⬡ ⬡ ⬢ W ⬡
       ⬡ ⬢ ⬡ W ⬡
        ⬡ ⬡ ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      3,
    );

    expect(nextPlayAdvice).toStrictEqual({ x: 4, y: 0 });
  });

  it('Should get a suggestion to play at (0, 1) as WHITE on this 2x2 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    W ⬡
     ⬡ ⬢
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 1 });
  });

  it('Should get a suggestion to play at (0, 1) as BLACK on this 2x2 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    W ⬡
     ⬡ ⬢
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'black',
      2,
    );

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 1 });
  });

  it('Should get a suggestion to play at (1, 1) as BLACK on this 2x2 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ W
     ⬢ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'black',
      2,
    );

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 1 });
  });

  it('Should get a suggestion to play at (1, 1) as WHITE on this 2x2 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ W
     ⬢ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 1 });
  });
  it('Should get a suggestion to play at (1, 0) or (0,1) as WHITE on this 2x2 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ ⬡
     ⬡ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ]),
    ).toBeTruthy();
  });
  it('Should get a suggestion to play at (1, 1) or (0, 1) as BLACK on this 2x2 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
    ⬡ ⬡
     ⬡ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'black',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play anything as WHITE on this 3x3 board since I have probably lost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬢ ⬡
   W ⬢ ⬡
    ⬡ W ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play anything but (2, 2) as BLACK on this 3x3 board', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬢ ⬡
   W ⬢ ⬡
    ⬡ W ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'black',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play at (0, 1) as WHITE on this 3x3 board since black is about to win', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ W
   ⬡ ⬢ ⬢
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 0, y: 1 }]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play at (0, 1) or (2, 1) as BLACK on this 3x3 board', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ W
   ⬡ ⬢ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'black',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [
        { x: 0, y: 1 },
        { x: 2, y: 1 },
      ]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play at (0, 1) as WHITE on this 5x5 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡ W ⬡
   ⬡ ⬢ W W ⬢
    W ⬢ W ⬢ ⬢
     W ⬢ ⬢ W ⬢
      W ⬢ W ⬢ W
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 0, y: 1 }]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play at (1, 1) as BLACK on this 5x5 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡ W ⬡
   ⬡ ⬡ W W ⬢
    W ⬢ W ⬢ ⬢
     W ⬢ ⬢ W ⬢
      W ⬢ W ⬢ W
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'black',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 1, y: 1 }]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play at (0, 2) as WHITE on this 5x5 board with depth 2 minimax', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡ W ⬡
   ⬡ ⬡ W W ⬢
    ⬡ ⬢ W ⬢ ⬢
     W ⬢ ⬢ W ⬢
      W ⬢ W ⬢ W
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      2,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 0, y: 2 }]),
    ).toBeTruthy();
  });

  it('Should get a suggestion to play at (0, 2) as WHITE on this 5x5 board with depth 3 minimax', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡ W ⬡
   ⬡ ⬡ W W ⬢
    ⬡ ⬢ W ⬢ ⬢
     W ⬢ ⬢ W ⬢
      W ⬢ W ⬢ W
  `);

    const nextPlayAdvice = getMinimaxNextPlaySuggestion(
      input.board,
      'white',
      3,
    );

    expect(
      areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 0, y: 2 }]),
    ).toBeTruthy();
  });
});
