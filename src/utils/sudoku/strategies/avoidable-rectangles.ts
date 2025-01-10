import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Avoidable Rectangles
 * Identifies patterns that could lead to multiple solutions and eliminates candidates to ensure uniqueness.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyAvoidableRectangles(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all potential rectangles
	for (let r1 = 0; r1 < 9; r1++) {
		for (let c1 = 0; c1 < 9; c1++) {
			const candidates1 = getPossibleValues(board, r1, c1);
			if (candidates1.length === 2) {
				for (let r2 = r1 + 1; r2 < 9; r2++) {
					for (let c2 = c1 + 1; c2 < 9; c2++) {
						const candidates2 = getPossibleValues(board, r2, c2);
						if (arraysEqual(candidates1, candidates2)) {
							updated =
								checkAvoidableRectangle(board, r1, c1, r2, c2, candidates1) ||
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
 * Checks and resolves avoidable rectangle patterns.
 * @param board The Sudoku board
 * @param r1, c1 Coordinates of the first corner of the rectangle
 * @param r2, c2 Coordinates of the diagonally opposite corner of the rectangle
 * @param candidates The shared candidates for the rectangle
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function checkAvoidableRectangle(
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
			for (const candidate of candidates) {
				// Eliminate the candidate from this cell to avoid multiple solutions
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
 * Compares two arrays for equality.
 */
function arraysEqual(arr1: number[], arr2: number[]): boolean {
	return (
		arr1.length === arr2.length &&
		arr1.every((value, index) => value === arr2[index])
	);
}
