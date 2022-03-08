import expect from 'expect';
import { parseGameStateFromMultilineString } from './utils';
import { getWinnablePathCost } from './pathfinding';

describe('Shortest path cost', () => {
  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(201);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬢
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬡ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "white");

    expect(cost).toStrictEqual(300);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(3);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ W ⬡
    ⬡ ⬡ W
  `);

    const cost = getWinnablePathCost(input, "white");

    expect(cost).toStrictEqual(201);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ W
   ⬡ W ⬡
    W ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, 'white');

    expect(cost).toStrictEqual(3);
  });

  it('Should return a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(3);
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

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(409);
  });

  it('Should return a negative winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getWinnablePathCost(input, "white");

    expect(cost).toStrictEqual(-1);
  });
});
