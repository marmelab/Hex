import expect from 'expect';
import { Coordinates, parseGameStateFromMultilineString } from './utils';
import { getNextPlayAdvice } from './prediction';

function areCoordinatesEquals(coord1: Coordinates, coord2: Coordinates) {
  return coord1.x === coord2.x && coord1.y === coord2.y;
}

describe('Should get an advice for the next play', () => {
  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "black");

    expect(areCoordinatesEquals(nextPlayAdvice, { x: 2, y: 2 }) || areCoordinatesEquals(nextPlayAdvice, { x: 2, y: 1 })).toBeTruthy();
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬢
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "black");

    expect(areCoordinatesEquals(nextPlayAdvice, { x: 1, y: 2 }) || areCoordinatesEquals(nextPlayAdvice, { x: 1, y: 1 })).toBeTruthy();
  });


  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "black");

    expect(areCoordinatesEquals(nextPlayAdvice, { x: 0, y: 2 }) || areCoordinatesEquals(nextPlayAdvice, { x: 0, y: 1 })).toBeTruthy();
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   W ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");

    expect(areCoordinatesEquals(nextPlayAdvice, { x: 0, y: 0 }) || areCoordinatesEquals(nextPlayAdvice, { x: 1, y: 1 })).toBeTruthy();
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");

    expect(areCoordinatesEquals(nextPlayAdvice, { x: 0, y: 1 }) || areCoordinatesEquals(nextPlayAdvice, { x: 1, y: 1 })).toBeTruthy();
  });

  it('Should get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   W ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");

    expect(areCoordinatesEquals(nextPlayAdvice, { x: 0, y: 2 }) || areCoordinatesEquals(nextPlayAdvice, { x: 1, y: 2 })).toBeTruthy();
  });

  it('Should get an obvious advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬡ ⬢
    ⬢ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 1 });
  });

  it('Should throw an error if no playable cell is given', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    expect(() => getNextPlayAdvice(input, "white")).toThrowError();
  });
});
