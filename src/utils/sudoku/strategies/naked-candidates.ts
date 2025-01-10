import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Naked Candidates (2.0 - 2.5)
 * Identifies cells with only one candidate (Naked Single).
 */
export function applyNakedCandidates(board: SudokuBoard): boolean {
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

	// Placeholder for Naked Pairs logic (future implementation)

	return updated;
}
