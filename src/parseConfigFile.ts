import * as fs from "fs";
import { Cell, GameState } from "./gamestate";

const BLACK_STONE_VALUE = 1;

export function parseGameStateFromFile(filePath: string): GameState {
  const fileContent = loadFile(filePath);
  return parseConfigFile(fileContent, filePath);
}

export function parseConfigFile(
  fileContent: string,
  filePath: string
): GameState {
  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(error);
    throw Error(`Unable to parse config file ${filePath}`);
  }
  if (!Array.isArray(data)) {
    throw Error(`Malformed config file ${filePath}`);
  }
  const rowsCount = data.length;
  let board = [];
  for (const row of data) {
    board.push(parseRow(row, rowsCount, filePath));
  }
  const gameState = { board: board };
  return gameState;
}

function loadFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(error);
    throw Error(`Unable to read config file ${filePath}`);
  }
}

function parseRow(row: any, rowsCount: number, filePath: string): Array<Cell> {
  if (!Array.isArray(row)) {
    throw Error(`Malformed config file ${filePath}`);
  }
  if (row.length !== rowsCount) {
    throw Error(
      `Malformed config file ${filePath}: all rows should contain ${rowsCount} cells`
    );
  }
  let parsedRow: Array<Cell> = [];
  for (let cell of row) {
    parsedRow.push(parseCell(cell));
  }
  return parsedRow;
}

function parseCell(cell: any): Cell {
  let parsedCell: Cell;
  switch (cell.value) {
    case null:
      parsedCell = { value: "empty" };
      break;
    case BLACK_STONE_VALUE:
      parsedCell = { value: "black" };
      break;
    default:
      throw Error(`Cannot parse config file: Invalid value: ${cell.value}`);
  }
  return parsedCell;
}
