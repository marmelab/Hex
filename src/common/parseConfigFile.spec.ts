import expect from 'expect';
import { GameState } from './gameState';
import { parseConfigFile } from './parseConfigFile';

describe('load game state from a config file content', () => {
  it('should load a valid string without error', () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": null }, { "value": 1 }],
      [{ "value": null }, { "value": null }, { "value": null }],
      [{ "value": 2 }, { "value": null }, { "value": 2 }]
    ]`;
    const filePath = 'configfile.json';
    // when
    const ouput = parseConfigFile(input, filePath);
    // then
    const expected: GameState = {
      turn: 'white',
      winner: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'white' }],
      ],
    };
    expect(ouput).toStrictEqual(expected);
  });

  it('should throw an error if the content is not valid JSON', () => {
    // given
    const input = `[
      [{ value: 1 }],
    ]`; // value instead of "value"
    const filePath = 'configfile.json';
    // when
    const func = () => parseConfigFile(input, filePath);
    // then
    expect(func).toThrowError('Unable to parse config file configfile.json');
  });

  it('should throw an error if a col is missing in a row', () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": null }, { "value": 1 }],
      [{ "value": null }, { "value": null }],
      [{ "value": null }, { "value": null }, { "value": null }]
    ]`;
    const filePath = 'configfile.json';
    // when
    const func = () => parseConfigFile(input, filePath);
    // then
    expect(func).toThrowError(
      'Malformed config file configfile.json: all rows should contain 3 cells',
    );
  });

  it('should throw an error if an unrecognized value is found', () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": 99 }, { "value": 1 }],
      [{ "value": null }, { "value": null }, { "value": null }],
      [{ "value": null }, { "value": null }, { "value": null }]
    ]`;
    const filePath = 'configfile.json';
    // when
    const func = () => parseConfigFile(input, filePath);
    // then
    expect(func).toThrowError('Cannot parse config file: Invalid value: 99');
  });

  it('should load a an empty board when the file is empty', () => {
    // given
    const input = `[
    ]`;
    const filePath = 'configfile.json';
    // when
    const ouput = parseConfigFile(input, filePath);
    // then
    const expected: GameState = {
      turn: 'white',
      winner: null,
      board: [],
    };
    expect(ouput).toStrictEqual(expected);
  });

  it("should tell it's white player's turn to play if there is more black stones than white stones", () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": null }, { "value": 1 }],
      [{ "value": null }, { "value": 1 }, { "value": null }],
      [{ "value": 2 }, { "value": null }, { "value": 2 }]
    ]`;
    const filePath = 'configfile.json';
    // when
    const ouput = parseConfigFile(input, filePath);
    // then
    const expected: GameState = {
      turn: 'white',
      winner: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'empty' }, { value: 'black' }, { value: 'empty' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'white' }],
      ],
    };
    expect(ouput).toStrictEqual(expected);
  });

  it("should tell it's black player's turn to play if there is more white stones than black stones", () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": null }, { "value": 1 }],
      [{ "value": null }, { "value": 2 }, { "value": null }],
      [{ "value": 2 }, { "value": null }, { "value": 2 }]
    ]`;
    const filePath = 'configfile.json';
    // when
    const ouput = parseConfigFile(input, filePath);
    // then
    const expected: GameState = {
      turn: 'black',
      winner: null,
      board: [
        [{ value: 'black' }, { value: 'empty' }, { value: 'black' }],
        [{ value: 'empty' }, { value: 'white' }, { value: 'empty' }],
        [{ value: 'white' }, { value: 'empty' }, { value: 'white' }],
      ],
    };
    expect(ouput).toStrictEqual(expected);
  });
});
