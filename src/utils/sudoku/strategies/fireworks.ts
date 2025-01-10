import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Fireworks
 * Identifies and resolves patterns where candidates align across blocks and rows/columns.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyFireworks(board: SudokuBoard): boolean {
	let updated = false;

	// Check each block for potential fireworks patterns
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			updated = checkFireworksInBlock(board, blockRow, blockCol) || updated;
		}
	}

	return updated;
}

/**
 * Checks for fireworks patterns within a specific block.
 * @param board The Sudoku board
 * @param blockRow The block row index (0-2)
 * @param blockCol The block column index (0-2)
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function checkFireworksInBlock(
	board: SudokuBoard,
	blockRow: number,
	blockCol: number,
): boolean {
	let updated = false;

	const blockCells = getBlockCells(blockRow, blockCol);

	// Collect candidates and their positions within the block
	const candidatePositions = new Map<number, [number, number][]>();

	for (const [row, col] of blockCells) {
		if (board[row][col] === 0) {
			const possibleValues = getPossibleValues(board, row, col);
			for (const candidate of possibleValues) {
				if (!candidatePositions.has(candidate)) {
					candidatePositions.set(candidate, []);
				}
				candidatePositions.get(candidate)!.push([row, col]);
			}
		}
	}

	// Identify fireworks patterns for each candidate
	for (const [candidate, positions] of candidatePositions) {
		if (positions.length === 4) {
			const [rows, cols] = extractUniqueRowsAndCols(positions);

			if (rows.size === 2 && cols.size === 2) {
				// Candidate forms a fireworks pattern
				updated =
					eliminateFireworksCandidates(
						board,
						candidate,
						Array.from(rows),
						Array.from(cols),
					) || updated;
			}
		}
	}

	return updated;
}

/**
 * Eliminates candidates in the intersecting rows and columns of a fireworks pattern.
 */
function eliminateFireworksCandidates(
	board: SudokuBoard,
	candidate: number,
	rows: number[],
	cols: number[],
): boolean {
	let updated = false;

	for (const row of rows) {
		for (let col = 0; col < 9; col++) {
			if (!cols.includes(col) && board[row][col] === 0) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					updated = true;
					// Simulate elimination (modify logic to store/eliminate candidates)
				}
			}
		}
	}

	for (const col of cols) {
		for (let row = 0; row < 9; row++) {
			if (!rows.includes(row) && board[row][col] === 0) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					updated = true;
					// Simulate elimination (modify logic to store/eliminate candidates)
				}
			}
		}
	}

	return updated;
}

/**
 * Extracts unique rows and columns from a list of cell positions.
 */
function extractUniqueRowsAndCols(
	positions: [number, number][],
): [Set<number>, Set<number>] {
	const rows = new Set<number>();
	const cols = new Set<number>();

	for (const [row, col] of positions) {
		rows.add(row);
		cols.add(col);
	}

	return [rows, cols];
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
