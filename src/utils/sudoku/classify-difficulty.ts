import { strategies } from "./strategies";
import type { SudokuBoard } from "./types";

/**
 * Classifies the difficulty of a Sudoku board.
 * Returns a difficulty level between 0 and 10.
 */
export function classifyDifficulty(board: SudokuBoard): number {
	let difficulty = 0;

	for (const strategy of strategies) {
		while (strategy.apply(board)) {
			console.log(strategy.level);
			difficulty = Math.max(difficulty, strategy.level);
		}
	}

	return difficulty;
}
