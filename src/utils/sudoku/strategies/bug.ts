import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: BUG (Bivalue Universal Grave)
 * Identifies and resolves BUG configurations to eliminate candidates.
 * @returns `true` if any candidate was resolved or eliminated, `false` otherwise.
 */
export function applyBUG(board: SudokuBoard): boolean {
	let updated = false;

	// Identify BUG pattern
	const bivalueCells: [number, number][] = [];
	let nonBivalueCell: [number, number, number[]] | null = null;

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				const possibleValues = getPossibleValues(board, row, col);

				if (possibleValues.length === 2) {
					bivalueCells.push([row, col]);
				} else if (possibleValues.length > 2) {
					if (nonBivalueCell) {
						// More than one non-bivalue cell invalidates the BUG pattern
						return false;
					}
					nonBivalueCell = [row, col, possibleValues];
				}
			}
		}
	}

	// Validate BUG pattern and resolve
	if (nonBivalueCell && validateBUG(bivalueCells, board)) {
		const [row, col, candidates] = nonBivalueCell;

		// Eliminate all but one candidate in the non-bivalue cell
		for (const candidate of candidates) {
			const conflicts = isCandidateConflicting(board, row, col, candidate);
			if (!conflicts) {
				board[row][col] = candidate;
				updated = true;
				break;
			}
		}
	}

	return updated;
}

/**
 * Validates whether the board matches a BUG pattern.
 * A BUG pattern means all unsolved cells are bivalue, except for one with multiple candidates.
 */
function validateBUG(
	bivalueCells: [number, number][],
	board: SudokuBoard,
): boolean {
	const candidateCount = new Map<number, number>();

	for (const [row, col] of bivalueCells) {
		const possibleValues = getPossibleValues(board, row, col);
		for (const value of possibleValues) {
			candidateCount.set(value, (candidateCount.get(value) || 0) + 1);
		}
	}

	// In a BUG pattern, all candidates appear an even number of times
	for (const [, count] of candidateCount) {
		if (count % 2 !== 0) return false;
	}

	return true;
}

/**
 * Checks if placing a candidate in a cell causes conflicts.
 */
function isCandidateConflicting(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): boolean {
	// Check row and column
	for (let i = 0; i < 9; i++) {
		if (board[row][i] === candidate || board[i][col] === candidate) {
			return true;
		}
	}

	// Check block
	const blockStartRow = Math.floor(row / 3) * 3;
	const blockStartCol = Math.floor(col / 3) * 3;
	for (let r = blockStartRow; r < blockStartRow + 3; r++) {
		for (let c = blockStartCol; c < blockStartCol + 3; c++) {
			if (board[r][c] === candidate) {
				return true;
			}
		}
	}

	return false;
}
