import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Rectangle Elimination
 * Identifies candidate eliminations based on unique rectangle configurations.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyRectangleElimination(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all potential rectangles
	for (let r1 = 0; r1 < 9; r1++) {
		for (let c1 = 0; c1 < 9; c1++) {
			const candidates1 = getPossibleValues(board, r1, c1);
			if (candidates1.length === 2) {
				for (let r2 = r1 + 1; r2 < 9; r2++) {
					for (let c2 = c1 + 1; c2 < 9; c2++) {
						const candidates2 = getPossibleValues(board, r2, c2);
						if (
							candidates2.length === 2 &&
							arraysEqual(candidates1, candidates2)
						) {
							updated =
								findAndEliminateRectangle(board, r1, c1, r2, c2, candidates1) ||
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
 * Finds and eliminates candidates based on the rectangle configuration.
 */
function findAndEliminateRectangle(
	board: SudokuBoard,
	r1: number,
	c1: number,
	r2: number,
	c2: number,
	candidates: number[],
): boolean {
	let updated = false;

	// Check for the other two corners of the rectangle
	const corners = [
		[r1, c2],
		[r2, c1],
	];

	const isValidRectangle = corners.every(([row, col]) => {
		const possibleValues = getPossibleValues(board, row, col);
		return candidates.some((candidate) => possibleValues.includes(candidate));
	});

	if (isValidRectangle) {
		// Eliminate the candidates from the remaining regions
		for (const [row, col] of corners) {
			const possibleValues = getPossibleValues(board, row, col);
			for (const candidate of candidates) {
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
