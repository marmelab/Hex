import expect from 'expect';
import { getBoardCoordinatesFromUserInput } from './user';

describe('Transform user input to board coordinates', () => {
  it("Should throw an error if the user input isn't valid", () => {
    const invalidUserInput = 'zkfdakzjrokjé';

    const getBoardCoordinatesFromUserInputCall = () => {
      getBoardCoordinatesFromUserInput(invalidUserInput);
    };

    expect(getBoardCoordinatesFromUserInputCall).toThrowError();
  });

  it('Should throw an error if the input is empty', () => {
    const invalidUserInput = '';

    const getBoardCoordinatesFromUserInputCall = () => {
      getBoardCoordinatesFromUserInput(invalidUserInput);
    };

    expect(getBoardCoordinatesFromUserInputCall).toThrowError();
  });

  it('Should return a x,y position', () => {
    const validUserInput = 'A1';

    const boardCoordinates = getBoardCoordinatesFromUserInput(validUserInput);

    expect(boardCoordinates).toEqual({ x: 0, y: 0 });
  });
});
