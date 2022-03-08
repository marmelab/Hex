import expect from 'expect';
import { parseGameStateFromMultilineString } from './utils';
import { getNextPlayAdvice } from './prediction';
import exp from 'constants';

describe('Get an advice for the next play', () => {
  it('Get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "black");

    expect(nextPlayAdvice).toStrictEqual({ x: 2, y: 2 });
  });

  it('Get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬢
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "black");

    expect(nextPlayAdvice).toStrictEqual({ x: 1, y: 2 });
  });


  it('Get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬢ ⬢
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "black");

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 2 });
  });

  it('Get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   W ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");

    expect(nextPlayAdvice).toStrictEqual({ x: 0, y: 0 });
  });

  it('Get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ ⬡ ⬡
    W ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");


  });

  it('Get a good advice', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   W ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const nextPlayAdvice = getNextPlayAdvice(input, "white");

    expect({ x: 1, y: 2 } === { x: 1, y: 2 }).toBeTruthy();
  });
});
