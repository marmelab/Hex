export interface Coordinates {
  x: number;
  y: number;
}

export const UTF16_CODE_OF_LETTER_A = 65;

export function deepCloneObject(objectToClone) {
  return JSON.parse(JSON.stringify(objectToClone));
}
