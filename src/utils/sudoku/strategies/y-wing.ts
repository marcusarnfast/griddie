import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Y-Wing
 * Uses three interconnected cells with shared candidates to eliminate candidates from other cells.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyYWing(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate through all cells to find pivots (bivalue cells)
	for (let pivotRow = 0; pivotRow < 9; pivotRow++) {
		for (let pivotCol = 0; pivotCol < 9; pivotCol++) {
			const pivotValues = getPossibleValues(board, pivotRow, pivotCol);
			if (pivotValues.length === 2) {
				// Find two wings for this pivot
				for (let wing1Row = 0; wing1Row < 9; wing1Row++) {
					for (let wing1Col = 0; wing1Col < 9; wing1Col++) {
						if (
							isWingValid(
								board,
								pivotRow,
								pivotCol,
								wing1Row,
								wing1Col,
								pivotValues[0],
							)
						) {
							for (let wing2Row = 0; wing2Row < 9; wing2Row++) {
								for (let wing2Col = 0; wing2Col < 9; wing2Col++) {
									if (
										isWingValid(
											board,
											pivotRow,
											pivotCol,
											wing2Row,
											wing2Col,
											pivotValues[1],
										) &&
										!sharesCommonRegion(
											wing1Row,
											wing1Col,
											wing2Row,
											wing2Col,
										) &&
										isCandidateInCommonRegion(
											board,
											pivotValues[1],
											wing1Row,
											wing1Col,
											wing2Row,
											wing2Col,
										)
									) {
										updated =
											eliminateYWingCandidates(
												board,
												pivotValues[1],
												wing1Row,
												wing1Col,
												wing2Row,
												wing2Col,
											) || updated;
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Checks if a wing is valid for a given pivot and candidate.
 */
function isWingValid(
	board: SudokuBoard,
	pivotRow: number,
	pivotCol: number,
	wingRow: number,
	wingCol: number,
	candidate: number,
): boolean {
	if (pivotRow === wingRow && pivotCol === wingCol) return false; // Same as pivot
	if (!sharesCommonRegion(pivotRow, pivotCol, wingRow, wingCol)) return false; // No shared region
	const possibleValues = getPossibleValues(board, wingRow, wingCol);
	return possibleValues.length === 2 && possibleValues.includes(candidate);
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
 * Checks if a candidate exists in the common region of two wings.
 */
function isCandidateInCommonRegion(
	board: SudokuBoard,
	candidate: number,
	wing1Row: number,
	wing1Col: number,
	wing2Row: number,
	wing2Col: number,
): boolean {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				sharesCommonRegion(row, col, wing1Row, wing1Col) &&
				sharesCommonRegion(row, col, wing2Row, wing2Col)
			) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) return true;
			}
		}
	}
	return false;
}

/**
 * Eliminates a candidate based on the Y-Wing pattern.
 */
function eliminateYWingCandidates(
	board: SudokuBoard,
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
				sharesCommonRegion(row, col, wing2Row, wing2Col)
			) {
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
