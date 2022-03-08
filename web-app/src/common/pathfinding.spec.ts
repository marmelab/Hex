import expect from 'expect';
import { parseGameStateFromMultilineString } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

describe('Shortest path cost', () => {
  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(2);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬢
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬡ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "white");

    expect(cost).toStrictEqual(3);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(0);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ W ⬡
    ⬡ ⬡ W
  `);

    const cost = getNbMovesNeededToWin(input, "white");

    expect(cost).toStrictEqual(2);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ W
   ⬡ W ⬡
    W ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, 'white');

    expect(cost).toStrictEqual(0);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(0);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢ ⬢ ⬡ ⬡ ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡ ⬡ ⬢ ⬡ ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡ ⬡ ⬡ ⬢ ⬡ ⬡ ⬡
     ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬢ ⬡ ⬡
      ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬢ ⬢
       ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
        ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
         ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ 
          ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input, "black");

    expect(cost).toStrictEqual(4);
  });

  it('Should return a negative winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getNbMovesNeededToWin(input, "white");

    expect(cost).toStrictEqual(-1);
  });
});
