import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Introduction (1.0)
 * Solves cells where only one number is possible in a block, row, or column.
 */
export function applyIntroduction(board: SudokuBoard): boolean {
	let updated = false;

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.length === 1) {
					board[row][col] = possibleValues[0];
					updated = true;
				}
			}
		}
	}

	return updated;
}
