import type { SudokuBoard } from "./types";

/**
 * Checks if a Sudoku board has a unique solution.
 */
export function hasUniqueSolution(board: SudokuBoard): boolean {
	return countSolutions(board) === 1;
}

/**
 * Counts the number of solutions for a given board.
 * Avoids reassigning the board parameter.
 */
function countSolutions(board: SudokuBoard, solutions = 0): number {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				for (let num = 1; num <= 9; num++) {
					if (isSafe(board, row, col, num)) {
						const newBoard = board.map((boardRow) => [...boardRow]); // Create a copy
						newBoard[row][col] = num; // Apply change
						const newSolutions = countSolutions(newBoard, solutions);
						if (newSolutions > 1) return newSolutions; // Early exit for efficiency
					}
				}
				return solutions;
			}
		}
	}
	return solutions + 1;
}

/**
 * Checks if a number can be safely placed on the board.
 */
function isSafe(
	board: SudokuBoard,
	row: number,
	col: number,
	num: number,
): boolean {
	for (let i = 0; i < 9; i++) {
		if (
			board[row][i] === num || // Row check
			board[i][col] === num || // Column check
			board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][
				Math.floor(col / 3) * 3 + (i % 3)
			] === num // Subgrid check
		) {
			return false;
		}
	}
	return true;
}
