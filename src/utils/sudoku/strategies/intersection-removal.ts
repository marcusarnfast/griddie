import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Intersection Removal (3.0 - 3.6)
 * Eliminates candidates through Pointing or Claiming.
 * @returns `true` if any candidate was removed, `false` otherwise.
 */
export function applyIntersectionRemoval(board: SudokuBoard): boolean {
	let updated = false;

	// Check each block
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			const blockCells = getBlockCells(board, blockRow, blockCol);

			// Check for Pointing (row/column within block)
			updated = updated || applyPointing(board, blockCells);

			// Check for Claiming (block within row/column)
			updated = updated || applyClaiming(board, blockCells);
		}
	}

	return updated;
}

/**
 * Applies the Pointing technique to eliminate candidates.
 */
function applyPointing(
	board: SudokuBoard,
	blockCells: [number, number][],
): boolean {
	let updated = false;

	for (let candidate = 1; candidate <= 9; candidate++) {
		const candidatePositions = blockCells.filter(([row, col]) => {
			const possibleValues = getPossibleValues(board, row, col);
			return possibleValues.includes(candidate);
		});

		if (candidatePositions.length > 0) {
			// Check if all candidate positions align within a single row or column
			const allInRow = candidatePositions.every(
				([row]) => row === candidatePositions[0][0],
			);
			const allInCol = candidatePositions.every(
				([, col]) => col === candidatePositions[0][1],
			);

			if (allInRow) {
				// Eliminate this candidate from the rest of the row
				const row = candidatePositions[0][0];
				updated =
					eliminateCandidateFromRow(board, candidate, row, blockCells) ||
					updated;
			}

			if (allInCol) {
				// Eliminate this candidate from the rest of the column
				const col = candidatePositions[0][1];
				updated =
					eliminateCandidateFromCol(board, candidate, col, blockCells) ||
					updated;
			}
		}
	}

	return updated;
}

/**
 * Applies the Claiming technique to eliminate candidates.
 */
function applyClaiming(
	board: SudokuBoard,
	blockCells: [number, number][],
): boolean {
	const updated = false;

	// Iterate over rows and columns of the block
	for (let candidate = 1; candidate <= 9; candidate++) {
		const candidatePositions = blockCells.filter(([row, col]) => {
			const possibleValues = getPossibleValues(board, row, col);
			return possibleValues.includes(candidate);
		});

		// Claiming logic goes here (future enhancement)

		// Placeholder for implementation
	}

	return updated;
}

/**
 * Gets all cells in a given block.
 */
function getBlockCells(
	board: SudokuBoard,
	blockRow: number,
	blockCol: number,
): [number, number][] {
	const cells: [number, number][] = [];
	for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
		for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
			cells.push([row, col]);
		}
	}
	return cells;
}

/**
 * Eliminates a candidate from all cells in a row, except for the block.
 */
function eliminateCandidateFromRow(
	board: SudokuBoard,
	candidate: number,
	row: number,
	blockCells: [number, number][],
): boolean {
	let updated = false;

	for (let col = 0; col < 9; col++) {
		if (!blockCells.some(([r, c]) => r === row && c === col)) {
			const possibleValues = getPossibleValues(board, row, col);
			if (possibleValues.includes(candidate)) {
				updated = true;
				// Simulate elimination (modify logic to store/eliminate candidates)
			}
		}
	}

	return updated;
}

/**
 * Eliminates a candidate from all cells in a column, except for the block.
 */
function eliminateCandidateFromCol(
	board: SudokuBoard,
	candidate: number,
	col: number,
	blockCells: [number, number][],
): boolean {
	let updated = false;

	for (let row = 0; row < 9; row++) {
		if (!blockCells.some(([r, c]) => r === row && c === col)) {
			const possibleValues = getPossibleValues(board, row, col);
			if (possibleValues.includes(candidate)) {
				updated = true;
				// Simulate elimination (modify logic to store/eliminate candidates)
			}
		}
	}

	return updated;
}
