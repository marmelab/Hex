import React from 'react';
import renderer from 'react-test-renderer';

import Board from './Board';

describe('Board', () => {
  it('Does not throw any error', () => {
    const gamestate = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'white' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'white' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }
    expect(() => renderer.create(<Board gameState={ gamestate } />)).not.toThrowError();
  });
  it('Render a board with the correct nb of cells', () => {
    const gamestate = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'white' }, { value: 'empty' }],
        [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
      ],
    }

    const board = renderer.create(<Board gameState={ gamestate } />).toJSON();

    expect(board.children[0].children.length).toBe(23);
  });
});
