import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './auth-provider';
import { GameList } from './components/GameList';
import { UserList, UserShow } from './components/UserList';
import dataProvider from './data-provider';
import fakeDataProvider from 'ra-data-fakerest';
import games from './fixtures/games.json';
import users from './fixtures/users.json';
import GameIcon from '@material-ui/icons/Gamepad';
import UserIcon from '@material-ui/icons/Group';

const myFakeDataProvider = fakeDataProvider({
  games,
  users,
});

const App = () => (
  <Admin dataProvider={myFakeDataProvider} authProvider={authProvider}>
    <Resource name="games" list={GameList} icon={GameIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} show={UserShow} />
  </Admin>
);

export default App;
