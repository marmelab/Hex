import * as React from 'react';
import { render } from '@testing-library/react';
import { GameList } from './GameList';

test('Render a game list without any error', () => {
  render(<GameList></GameList>);
  expect(() => render(<GameList></GameList>)).not.toThrowError();
});
