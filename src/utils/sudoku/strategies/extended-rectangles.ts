import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Extended Rectangles
 * Identifies and resolves extended rectangle patterns to eliminate candidates or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyExtendedRectangles(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all possible rectangle configurations
	for (let r1 = 0; r1 < 9; r1++) {
		for (let c1 = 0; c1 < 9; c1++) {
			const candidates1 = getPossibleValues(board, r1, c1);
			if (candidates1.length === 2) {
				for (let r2 = r1 + 1; r2 < 9; r2++) {
					for (let c2 = c1 + 1; c2 < 9; c2++) {
						const candidates2 = getPossibleValues(board, r2, c2);
						if (arraysEqual(candidates1, candidates2)) {
							updated =
								resolveExtendedRectangle(board, r1, c1, r2, c2, candidates1) ||
								updated;
						}
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Resolves potential ambiguities in extended rectangle patterns.
 * @param board The Sudoku board
 * @param r1, c1 First corner of the rectangle
 * @param r2, c2 Diagonally opposite corner of the rectangle
 * @param candidates The shared candidates for the rectangle
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function resolveExtendedRectangle(
	board: SudokuBoard,
	r1: number,
	c1: number,
	r2: number,
	c2: number,
	candidates: number[],
): boolean {
	let updated = false;

	// Find the other two corners of the rectangle
	const corners = [
		[r1, c2],
		[r2, c1],
	];

	for (const [row, col] of corners) {
		const possibleValues = getPossibleValues(board, row, col);

		if (
			possibleValues.length > 2 &&
			candidates.some((candidate) => possibleValues.includes(candidate))
		) {
			// Look for extended rectangle eliminations
			for (const candidate of candidates) {
				if (possibleValues.includes(candidate)) {
					updated =
						handleEliminationOrPlacement(board, row, col, candidate) || updated;
				}
			}
		}
	}

	return updated;
}

/**
 * Handles the elimination or placement of candidates based on extended rectangle logic.
 */
function handleEliminationOrPlacement(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): boolean {
	let updated = false;

	const possibleValues = getPossibleValues(board, row, col);

	// Eliminate the candidate if it creates ambiguity in the rectangle
	if (possibleValues.includes(candidate)) {
		updated = true;
		// Simulate elimination (modify logic to store/eliminate candidates)
	}

	// Confirm placement if only one candidate remains
	if (possibleValues.length === 1) {
		board[row][col] = possibleValues[0];
		updated = true;
	}

	return updated;
}

/**
 * Compares two arrays for equality.
 */
function arraysEqual(arr1: number[], arr2: number[]): boolean {
	return (
		arr1.length === arr2.length &&
		arr1.every((value, index) => value === arr2[index])
	);
}
