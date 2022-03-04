import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  TextInput,
} from 'react-admin';

interface UserListProps {}

export const UserList = (props: UserListProps) => (
  <List {...props} filters={userFilters}>
    <Datagrid rowClick="show">
      <NumberField source="id" />
      <TextField source="username" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <NumberField source="nb_games" label="Nb of games" />
    </Datagrid>
  </List>
);

const userFilters = [<TextInput label="Username" source="username" />];

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <NumberField source="id" />
      <TextField source="username" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <ReferenceManyField
        reference="games"
        target="player1.id"
        label="Games as Player 1"
      >
        <Datagrid>
          <TextField source="id" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <NumberField source="player1.id" />
          <NumberField source="player2.id" />
          <TextField source="status" />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField
        reference="games"
        target="player2.id"
        label="Games as Player 2"
      >
        <Datagrid>
          <TextField source="id" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <NumberField source="player1.id" />
          <NumberField source="player2.id" />
          <TextField source="status" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
