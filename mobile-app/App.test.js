import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('Render board game correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
