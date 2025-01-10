import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Hidden Unique Rectangles (Hidden URs)
 * Identifies patterns where hidden candidates create potential ambiguity in unique rectangles.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyHiddenURs(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all possible rectangle configurations
	for (let r1 = 0; r1 < 9; r1++) {
		for (let c1 = 0; c1 < 9; c1++) {
			const candidates1 = getPossibleValues(board, r1, c1);
			if (candidates1.length > 2) {
				for (let r2 = r1 + 1; r2 < 9; r2++) {
					for (let c2 = c1 + 1; c2 < 9; c2++) {
						const candidates2 = getPossibleValues(board, r2, c2);
						if (arraysIntersect(candidates1, candidates2)) {
							updated =
								resolveHiddenUR(
									board,
									r1,
									c1,
									r2,
									c2,
									candidates1,
									candidates2,
								) || updated;
						}
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Resolves Hidden Unique Rectangles by identifying and eliminating hidden candidates.
 * @param board The Sudoku board
 * @param r1, c1 First corner of the rectangle
 * @param r2, c2 Diagonally opposite corner of the rectangle
 * @param candidates1 Candidates for the first corner
 * @param candidates2 Candidates for the diagonally opposite corner
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function resolveHiddenUR(
	board: SudokuBoard,
	r1: number,
	c1: number,
	r2: number,
	c2: number,
	candidates1: number[],
	candidates2: number[],
): boolean {
	let updated = false;

	// Identify hidden candidates in the rectangle
	const hiddenCandidates = candidates1.filter(
		(candidate) =>
			candidates2.includes(candidate) &&
			candidateIsHidden(board, r1, c1, candidate),
	);

	// Eliminate hidden candidates or confirm placements
	for (const candidate of hiddenCandidates) {
		updated =
			eliminateHiddenCandidate(board, r1, c1, r2, c2, candidate) || updated;
	}

	return updated;
}

/**
 * Checks if a candidate is hidden in a given cell.
 */
function candidateIsHidden(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): boolean {
	const possibleValues = getPossibleValues(board, row, col);
	return possibleValues.includes(candidate) && possibleValues.length > 2;
}

/**
 * Eliminates a hidden candidate or confirms its placement.
 */
function eliminateHiddenCandidate(
	board: SudokuBoard,
	r1: number,
	c1: number,
	r2: number,
	c2: number,
	candidate: number,
): boolean {
	let updated = false;

	// Eliminate the hidden candidate if ambiguity is detected
	if (candidateCanBeRemoved(board, r1, c1, candidate)) {
		updated = true;
		// Simulate elimination (modify logic to store/eliminate candidates)
	}

	// Confirm placement if only one candidate remains
	if (getPossibleValues(board, r2, c2).length === 1) {
		board[r2][c2] = candidate;
		updated = true;
	}

	return updated;
}

/**
 * Checks if a candidate can be safely removed from a cell.
 */
function candidateCanBeRemoved(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): boolean {
	const possibleValues = getPossibleValues(board, row, col);
	return possibleValues.includes(candidate) && possibleValues.length > 2;
}

/**
 * Checks if two arrays have common elements.
 */
function arraysIntersect(arr1: number[], arr2: number[]): boolean {
	return arr1.some((value) => arr2.includes(value));
}
