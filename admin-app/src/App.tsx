import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { GameList } from './components/GameList';
import dataProvider from './data-provider';

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="games" list={GameList} />
  </Admin>
);

export default App;
