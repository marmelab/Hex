import expect from 'expect';
import { parseGameStateFromMultilineString } from './utils';
import { getWinnablePathCost } from './pathfinding';

describe('Shortest path cost', () => {
  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(201);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬢ ⬢ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬢
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬡ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(102);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬡ ⬡ ⬡
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "white");

    expect(cost).toStrictEqual(300);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬡ ⬡ ⬡
    ⬡ ⬡ ⬡
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(3);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  W ⬡ ⬡
   ⬡ W ⬡
    ⬡ ⬡ W
  `);

    const cost = getWinnablePathCost(input, "white");

    expect(cost).toStrictEqual(3);
  });

  it('Get a valid winning path cost', () => {
    const input = parseGameStateFromMultilineString(`
  ⬢ ⬢ ⬢
   ⬢ ⬢ ⬢
    ⬢ ⬢ ⬢
  `);

    const cost = getWinnablePathCost(input, "black");

    expect(cost).toStrictEqual(3);
  });

  it('Get a valid winning path cost', () => {
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

    expect(cost).toStrictEqual(9);
  });
});
