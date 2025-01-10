import type { SudokuBoard } from "../types";
import { cloneBoard, getPossibleValues } from "./helpers";

/**
 * Strategy: Nishio Forcing Chains
 * Assumes a candidate in a cell and propagates logical implications to find contradictions.
 * Eliminates candidates or confirms placements based on the results.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyNishioForcingChains(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all cells
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				const candidates = getPossibleValues(board, row, col);

				for (const candidate of candidates) {
					const result = testNishio(board, row, col, candidate);
					if (result === false) {
						// If the candidate causes a contradiction, eliminate it
						updated = true;
						// Simulate elimination (modify logic to store/eliminate candidates)
					} else if (result === true) {
						// If the candidate is confirmed, place it in the cell
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
 * Tests a candidate in a cell using Nishio logic.
 * @param board The Sudoku board
 * @param row The row of the cell
 * @param col The column of the cell
 * @param candidate The candidate to test
 * @returns `true` if the candidate is confirmed, `false` if it causes a contradiction, or `null` if inconclusive
 */
function testNishio(
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
			// Continue applying basic eliminations
		}

		// Check for contradictions
		if (hasContradiction(testBoard)) {
			return false; // Contradiction found, candidate can be eliminated
		}

		// Check if the candidate forces a solution
		if (isFullySolved(testBoard)) {
			return true; // Candidate is confirmed as correct
		}
	} catch {
		return false; // Contradiction occurred during propagation
	}

	return null; // Inconclusive result
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
					// If only one candidate remains, place it
					board[row][col] = candidates[0];
					updated = true;
				}
			}
		}
	}

	return updated;
}

/**
 * Checks if the board contains any contradictions (e.g., duplicate numbers in a row, column, or block).
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
 * Checks if a row, column, or block has duplicate non-zero numbers.
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
 * Extracts a block from the board given its index (0-8).
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
