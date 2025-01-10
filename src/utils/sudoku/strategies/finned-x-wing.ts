import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Finned X-Wing
 * Identifies and resolves patterns where an X-Wing structure includes additional candidates (fins) that influence eliminations.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyFinnedXWing(board: SudokuBoard): boolean {
	let updated = false;

	// Check rows and columns for Finned X-Wing patterns
	for (let candidate = 1; candidate <= 9; candidate++) {
		updated = findFinnedXWing(board, candidate, "row") || updated;
		updated = findFinnedXWing(board, candidate, "col") || updated;
	}

	return updated;
}

/**
 * Finds and resolves Finned X-Wing patterns in rows or columns.
 * @param board The Sudoku board
 * @param candidate The candidate to check for the Finned X-Wing pattern
 * @param mode "row" or "col" to specify the direction of search
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function findFinnedXWing(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
): boolean {
	let updated = false;

	// Collect possible positions for the candidate in each row or column
	const linePositions = Array.from({ length: 9 }, (_, index) =>
		findCandidatePositionsInLine(board, index, mode, candidate),
	);

	// Iterate over pairs of lines to check for X-Wing structures with fins
	for (let i = 0; i < 8; i++) {
		for (let j = i + 1; j < 9; j++) {
			const positions1 = linePositions[i];
			const positions2 = linePositions[j];

			if (positions1.length >= 2 && positions2.length >= 2) {
				const sharedColumnsOrRows = positions1.filter((pos) =>
					positions2.includes(pos),
				);

				if (sharedColumnsOrRows.length === 2) {
					// Check for fins
					const fins1 = positions1.filter(
						(pos) => !sharedColumnsOrRows.includes(pos),
					);
					const fins2 = positions2.filter(
						(pos) => !sharedColumnsOrRows.includes(pos),
					);

					if (fins1.length <= 1 && fins2.length <= 1) {
						updated =
							eliminateFinnedXWingCandidates(
								board,
								candidate,
								mode,
								i,
								j,
								sharedColumnsOrRows,
								fins1.concat(fins2),
							) || updated;
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Finds the positions of a candidate in a given line (row or column).
 */
function findCandidatePositionsInLine(
	board: SudokuBoard,
	lineIndex: number,
	mode: "row" | "col",
	candidate: number,
): number[] {
	const positions: number[] = [];

	for (let index = 0; index < 9; index++) {
		const [row, col] = mode === "row" ? [lineIndex, index] : [index, lineIndex];
		if (
			board[row][col] === 0 &&
			getPossibleValues(board, row, col).includes(candidate)
		) {
			positions.push(index);
		}
	}

	return positions;
}

/**
 * Eliminates candidates based on the Finned X-Wing pattern.
 */
function eliminateFinnedXWingCandidates(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
	line1: number,
	line2: number,
	sharedPositions: number[],
	fins: number[],
): boolean {
	let updated = false;

	// Determine the region where eliminations should occur
	const eliminationRegion =
		mode === "row"
			? sharedPositions.flatMap((col) => fins.map((row) => [row, col]))
			: sharedPositions.flatMap((row) => fins.map((col) => [row, col]));

	// Eliminate the candidate from cells in the elimination region
	for (const [row, col] of eliminationRegion) {
		const possibleValues = getPossibleValues(board, row, col);
		if (possibleValues.includes(candidate)) {
			updated = true;
			// Simulate elimination (modify logic to store/eliminate candidates)
		}
	}

	return updated;
}
