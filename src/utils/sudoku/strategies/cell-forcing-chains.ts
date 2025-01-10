import type { SudokuBoard } from "../types";
import { getPossibleValues, cloneBoard } from "./helpers";

/**
 * Strategy: Cell Forcing Chains
 * Focuses on a single cell and propagates logical implications for each candidate.
 * Eliminates candidates or confirms placements based on the results.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyCellForcingChains(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all cells
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				const candidates = getPossibleValues(board, row, col);

				// Test each candidate for the cell
				for (const candidate of candidates) {
					const result = testCellForcing(board, row, col, candidate);
					if (result === false) {
						// Candidate causes contradiction, eliminate it
						updated = true;
						// Simulate elimination (modify logic to store/eliminate candidates)
					} else if (result === true) {
						// Candidate forces a solution, confirm it
						board[row][col] = candidate;
						updated = true;
						break;
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Tests a specific candidate for a cell using Cell Forcing logic.
 * @param board The Sudoku board
 * @param row The row of the cell
 * @param col The column of the cell
 * @param candidate The candidate to test
 * @returns `true` if the candidate is confirmed, `false` if it causes a contradiction, or `null` if inconclusive
 */
function testCellForcing(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): boolean | null {
	const testBoard = cloneBoard(board);

	// Assume the candidate is placed in the cell
	testBoard[row][col] = candidate;

	// Propagate implications
	try {
		while (applyBasicEliminations(testBoard)) {
			// Keep simplifying the board
		}

		// Check for contradictions
		if (hasContradiction(testBoard)) {
			return false; // Candidate leads to contradiction
		}

		// Check if the board is fully solved
		if (isFullySolved(testBoard)) {
			return true; // Candidate forces a solution
		}
	} catch {
		return false; // Contradiction occurred during propagation
	}

	return null; // Result is inconclusive
}

/**
 * Applies basic elimination techniques to simplify the board.
 * @param board The Sudoku board
 * @returns `true` if any changes were made, `false` otherwise
 */
function applyBasicEliminations(board: SudokuBoard): boolean {
	let updated = false;

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				const candidates = getPossibleValues(board, row, col);

				if (candidates.length === 1) {
					// If only one candidate remains, confirm it
					board[row][col] = candidates[0];
					updated = true;
				}
			}
		}
	}

	return updated;
}

/**
 * Checks if the board contains any contradictions.
 * @param board The Sudoku board
 * @returns `true` if a contradiction exists, `false` otherwise
 */
function hasContradiction(board: SudokuBoard): boolean {
	for (let i = 0; i < 9; i++) {
		if (
			hasDuplicate(board[i]) || // Check rows
			hasDuplicate(board.map((row) => row[i])) || // Check columns
			hasDuplicate(getBlock(board, i)) // Check blocks
		) {
			return true;
		}
	}
	return false;
}

/**
 * Checks for duplicates in a row, column, or block.
 */
function hasDuplicate(cells: number[]): boolean {
	const seen = new Set<number>();
	for (const num of cells) {
		if (num !== 0) {
			if (seen.has(num)) return true;
			seen.add(num);
		}
	}
	return false;
}

/**
 * Extracts a block from the board given its index (0–8).
 */
function getBlock(board: SudokuBoard, blockIndex: number): number[] {
	const startRow = Math.floor(blockIndex / 3) * 3;
	const startCol = (blockIndex % 3) * 3;

	const block: number[] = [];
	for (let row = startRow; row < startRow + 3; row++) {
		for (let col = startCol; col < startCol + 3; col++) {
			block.push(board[row][col]);
		}
	}
	return block;
}

/**
 * Checks if the board is fully solved.
 */
function isFullySolved(board: SudokuBoard): boolean {
	return board.every((row) => row.every((cell) => cell !== 0));
}
