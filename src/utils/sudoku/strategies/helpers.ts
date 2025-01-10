import type { SudokuBoard } from "../types";

/**
 * Gets all possible values for a cell.
 */
export function getPossibleValues(
	board: SudokuBoard,
	row: number,
	col: number,
): number[] {
	const usedValues = new Set<number>();

	// Row and column
	for (let i = 0; i < 9; i++) {
		usedValues.add(board[row][i]);
		usedValues.add(board[i][col]);
	}

	// Block
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let r = startRow; r < startRow + 3; r++) {
		for (let c = startCol; c < startCol + 3; c++) {
			usedValues.add(board[r][c]);
		}
	}

	return Array.from({ length: 9 }, (_, i) => i + 1).filter(
		(val) => !usedValues.has(val),
	);
}

/**
 * Checks if a number can be safely placed at a given position.
 */
export function isSafe(
	board: SudokuBoard,
	row: number,
	col: number,
	num: number,
): boolean {
	// Row and column check
	for (let i = 0; i < 9; i++) {
		if (board[row][i] === num || board[i][col] === num) {
			return false;
		}
	}

	// Block check
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let r = startRow; r < startRow + 3; r++) {
		for (let c = startCol; c < startCol + 3; c++) {
			if (board[r][c] === num) {
				return false;
			}
		}
	}

	return true;
}

export function cloneBoard(board: SudokuBoard): SudokuBoard {
	return board.map((row) => [...row]);
}

/**
 * Maps cells in a region to their possible candidates.
 * @param board The Sudoku board
 * @param cells The list of cells in the region
 * @returns A map where each cell's key (e.g., "row,col") is mapped to its possible candidates
 */
export function getCandidateMap(
	board: SudokuBoard,
	cells: [number, number][],
): Map<string, Set<number>> {
	const candidateMap = new Map<string, Set<number>>();

	for (const [row, col] of cells) {
		if (board[row][col] === 0) {
			const possibleValues = getPossibleValues(board, row, col);
			if (possibleValues.length > 0) {
				candidateMap.set(`${row},${col}`, new Set(possibleValues));
			}
		}
	}

	return candidateMap;
}
