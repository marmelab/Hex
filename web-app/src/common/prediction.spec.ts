import expect from 'expect';
import { parseGameStateFromMultilineString, areExpectedCoordinatesInList } from './utils';
import { getNextPlaySuggestion } from './prediction';

describe('Should get an advice for the next play', () => {
  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "black");

    expect(areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 2, y: 2 }, { x: 2, y: 1 }])).toBeTruthy();
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬢
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "black");

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 2 });
  });


  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "black");

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 2 });
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   W ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "white");
    expect(areExpectedCoordinatesInList(nextPlayAdvice, [{ x: 0, y: 0 }, { x: 1, y: 0 }])).toBeTruthy();
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "white");

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 1 });
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   W ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "white");

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 2 });
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ W ⬡
    ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "white");
    expect(areExpectedCoordinatesInList(nextPlayAdvice, [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 }
    ])
    ).toBeTruthy();
  });

  it('Should get an obvious advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬡ ⬢
    ⬢ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlaySuggestion(input, "white");

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 1 });
  });

  it('Should throw an error if no playable cell is given', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    expect(() => getNextPlaySuggestion(input, "white")).toThrowError();
  });
});
