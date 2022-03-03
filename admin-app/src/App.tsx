import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './auth-provider';
import { GameList } from './components/GameList';
import dataProvider from './data-provider';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="games" list={GameList} />
  </Admin>
);

export default App;
