import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Hidden Candidates (2.5 - 3.0)
 * Identifies hidden candidates in rows, columns, or blocks.
 * @returns `true` if any candidate was resolved, `false` otherwise.
 */
export function applyHiddenCandidates(board: SudokuBoard): boolean {
	let updated = false;

	// Check rows for hidden candidates
	for (let row = 0; row < 9; row++) {
		updated = findHiddenCandidatesInUnit(board, getRowCells(row)) || updated;
	}

	// Check columns for hidden candidates
	for (let col = 0; col < 9; col++) {
		updated = findHiddenCandidatesInUnit(board, getColumnCells(col)) || updated;
	}

	// Check blocks for hidden candidates
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			updated =
				findHiddenCandidatesInUnit(board, getBlockCells(blockRow, blockCol)) ||
				updated;
		}
	}

	return updated;
}

/**
 * Finds and applies hidden candidates in a given unit (row, column, or block).
 * @param board The Sudoku board
 * @param unit Array of cell positions in the unit
 * @returns `true` if any candidate was resolved, `false` otherwise
 */
function findHiddenCandidatesInUnit(
	board: SudokuBoard,
	unit: [number, number][],
): boolean {
	let updated = false;
	const candidatePositions: Map<number, [number, number][]> = new Map();

	// Map candidates to their positions in the unit
	for (const [row, col] of unit) {
		if (board[row][col] === 0) {
			const possibleValues = getPossibleValues(board, row, col);
			for (const value of possibleValues) {
				if (!candidatePositions.has(value)) {
					candidatePositions.set(value, []);
				}
				candidatePositions.get(value)?.push([row, col]);
			}
		}
	}

	// Identify hidden candidates
	for (const [candidate, positions] of candidatePositions) {
		if (positions.length === 1) {
			const [row, col] = positions[0];
			board[row][col] = candidate;
			updated = true;
		}
	}

	return updated;
}

/**
 * Gets all cells in a given row.
 */
function getRowCells(row: number): [number, number][] {
	return Array.from({ length: 9 }, (_, col) => [row, col] as [number, number]);
}

/**
 * Gets all cells in a given column.
 */
function getColumnCells(col: number): [number, number][] {
	return Array.from({ length: 9 }, (_, row) => [row, col] as [number, number]);
}

/**
 * Gets all cells in a given block.
 */
function getBlockCells(blockRow: number, blockCol: number): [number, number][] {
	const cells: [number, number][] = [];
	for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
		for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
			cells.push([row, col]);
		}
	}
	return cells;
}
