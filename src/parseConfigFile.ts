import * as fs from "fs";
import { Cell, CellValue, GameState } from "./gamestate";

export function parseConfigFile(filePath: string): GameState {
  try {
    let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!Array.isArray(data)) {
      throw Error(`Malformed config file ${filePath}`);
    }
    let rowsCount = data.length;
    let gameState = { board: [] };
    for (let row of data) {
      gameState.board.push(parseRow(row, rowsCount, filePath));
    }
    return gameState;
  } catch (error) {
    console.error(error);
    throw Error(`Unable to parse config file ${filePath}`);
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
    let parsedCell = { value: parseCellValue(cell) };
    parsedRow.push(parsedCell);
  }
  return parsedRow;
}

function parseCellValue(cell: any): CellValue {
  if (cell.value == null) {
    return CellValue.Empty;
  } else if (cell.value == "1") {
    return CellValue.Black;
  } else {
    throw Error(`Cannot parse config file: Invalid value: ${cell.value}`);
  }
}
