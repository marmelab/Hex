import * as React from 'react';
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';

interface UserListProps {}

export const UserList = (props: UserListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);
