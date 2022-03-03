import * as React from 'react';
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';

interface GameListProps {}

export const GameList = (props: GameListProps) => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <NumberField source="player1.id" />
      <NumberField source="player2.id" />
      <TextField source="status" />
    </Datagrid>
  </List>
);
