import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { GameList } from './GameList';
import { Admin, Resource } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';
import gamesTestData from '../fixtures/games.json';

test('Render a game list without any error', async () => {
  render(
    <Admin dataProvider={fakeDataProvider(gamesTestData)}>
      <Resource name="games" list={GameList} />
    </Admin>,
  );
  expect(await screen.findAllByText(/Add filter/)).toHaveLength(1);
});
