import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: XYZ-Wing
 * Uses three interconnected cells with shared candidates to eliminate candidates from other cells.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyXYZWing(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate through all cells to find pivots (tri-value cells)
	for (let pivotRow = 0; pivotRow < 9; pivotRow++) {
		for (let pivotCol = 0; pivotCol < 9; pivotCol++) {
			const pivotValues = getPossibleValues(board, pivotRow, pivotCol);
			if (pivotValues.length === 3) {
				updated =
					findAndEliminateXYZWing(board, pivotRow, pivotCol, pivotValues) ||
					updated;
			}
		}
	}

	return updated;
}

/**
 * Finds and eliminates candidates based on the XYZ-Wing pattern.
 */
function findAndEliminateXYZWing(
	board: SudokuBoard,
	pivotRow: number,
	pivotCol: number,
	pivotValues: number[],
): boolean {
	let updated = false;

	// Look for two wings that connect to the pivot
	const wings: Wing[] = [];
	for (let wingRow = 0; wingRow < 9; wingRow++) {
		for (let wingCol = 0; wingCol < 9; wingCol++) {
			if (wingRow === pivotRow && wingCol === pivotCol) continue;

			const wingValues = getPossibleValues(board, wingRow, wingCol);
			if (
				wingValues.length === 2 &&
				pivotValues.some((val) => wingValues.includes(val)) &&
				sharesCommonRegion(pivotRow, pivotCol, wingRow, wingCol)
			) {
				wings.push({ row: wingRow, col: wingCol, values: wingValues });
			}
		}
	}

	// Process pairs of wings
	for (let i = 0; i < wings.length - 1; i++) {
		for (let j = i + 1; j < wings.length; j++) {
			const wing1 = wings[i];
			const wing2 = wings[j];
			const commonValue = pivotValues.find(
				(val) => wing1.values.includes(val) && wing2.values.includes(val),
			);

			if (commonValue) {
				// Eliminate the common value from cells in the shared region
				updated =
					eliminateXYZWingCandidates(
						board,
						pivotRow,
						pivotCol,
						commonValue,
						wing1.row,
						wing1.col,
						wing2.row,
						wing2.col,
					) || updated;
			}
		}
	}

	return updated;
}

/**
 * Eliminates candidates based on the XYZ-Wing pattern.
 */
function eliminateXYZWingCandidates(
	board: SudokuBoard,
	pivotRow: number,
	pivotCol: number,
	candidate: number,
	wing1Row: number,
	wing1Col: number,
	wing2Row: number,
	wing2Col: number,
): boolean {
	let updated = false;

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				sharesCommonRegion(row, col, wing1Row, wing1Col) &&
				sharesCommonRegion(row, col, wing2Row, wing2Col) &&
				!(
					(row === pivotRow && col === pivotCol) ||
					(row === wing1Row && col === wing1Col) ||
					(row === wing2Row && col === wing2Col)
				)
			) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					updated = true;

					// Eliminate the candidate
					const index = possibleValues.indexOf(candidate);
					if (index !== -1) {
						possibleValues.splice(index, 1);
					}

					// Apply updated candidates to the board (if required)
				}
			}
		}
	}

	return updated;
}

/**
 * Determines if two cells share a common region (row, column, or block).
 */
function sharesCommonRegion(
	row1: number,
	col1: number,
	row2: number,
	col2: number,
): boolean {
	return (
		row1 === row2 ||
		col1 === col2 ||
		(Math.floor(row1 / 3) === Math.floor(row2 / 3) &&
			Math.floor(col1 / 3) === Math.floor(col2 / 3))
	);
}

/**
 * Type for a wing cell in the XYZ-Wing pattern.
 */
type Wing = {
	row: number;
	col: number;
	values: number[];
};
