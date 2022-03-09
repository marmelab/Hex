import expect from 'expect';
import { parseGameStateFromMultilineString } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

describe('Shortest path cost', () => {
  it('Should return a winning path cost of 2', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(2);
  });

  it('Should return a winning path cost of 1', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a winning path cost of 1', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬢
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a winning path cost of 1', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬡ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a winning path cost of 1', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(1);
  });

  it('Should return a winning path cost of 3', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, "white");

    expect(cost).toStrictEqual(3);
  });

  it('Should return a winning path cost of 0', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(0);
  });

  it('Should return a winning path cost of 2', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ W ⬡
    ⬡ ⬡ W
  `);

    const cost = getNbMovesNeededToWin(input.board, "white");

    expect(cost).toStrictEqual(2);
  });

  it('Should return a winning path cost of 0', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ W
   ⬡ W ⬡
    W ⬡ ⬡
  `);

    const cost = getNbMovesNeededToWin(input.board, 'white');

    expect(cost).toStrictEqual(0);
  });

  it('Should return a winning path cost of 0', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(0);
  });

  it('Should return a winning path cost of 4', () => {
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

    const cost = getNbMovesNeededToWin(input.board, "black");

    expect(cost).toStrictEqual(4);
  });

  it('Should return a winning path cost of -1', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getNbMovesNeededToWin(input.board, "white");

    expect(cost).toStrictEqual(-1);
  });
});
