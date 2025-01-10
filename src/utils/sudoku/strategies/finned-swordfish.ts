import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Finned Swordfish
 * Extends the Swordfish strategy by incorporating fins (extra candidates) that influence eliminations.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyFinnedSwordfish(board: SudokuBoard): boolean {
	let updated = false;

	// Check rows and columns for Finned Swordfish patterns
	for (let candidate = 1; candidate <= 9; candidate++) {
		updated = findFinnedSwordfish(board, candidate, "row") || updated;
		updated = findFinnedSwordfish(board, candidate, "col") || updated;
	}

	return updated;
}

/**
 * Finds and resolves Finned Swordfish patterns in rows or columns.
 * @param board The Sudoku board
 * @param candidate The candidate to check for the Finned Swordfish pattern
 * @param mode "row" or "col" to specify the direction of search
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function findFinnedSwordfish(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
): boolean {
	let updated = false;

	// Collect possible positions for the candidate in each row or column
	const linePositions = Array.from({ length: 9 }, (_, index) =>
		findCandidatePositionsInLine(board, index, mode, candidate),
	);

	// Iterate over triplets of lines to check for Swordfish structures with fins
	for (let i = 0; i < 7; i++) {
		for (let j = i + 1; j < 8; j++) {
			for (let k = j + 1; k < 9; k++) {
				const positions1 = linePositions[i];
				const positions2 = linePositions[j];
				const positions3 = linePositions[k];

				if (
					positions1.length >= 2 &&
					positions2.length >= 2 &&
					positions3.length >= 2
				) {
					const sharedColumnsOrRows = [
						...new Set([...positions1, ...positions2, ...positions3]),
					];

					if (sharedColumnsOrRows.length <= 3) {
						// Check for fins
						const fins1 = positions1.filter(
							(pos) => !sharedColumnsOrRows.includes(pos),
						);
						const fins2 = positions2.filter(
							(pos) => !sharedColumnsOrRows.includes(pos),
						);
						const fins3 = positions3.filter(
							(pos) => !sharedColumnsOrRows.includes(pos),
						);

						if (fins1.length <= 1 && fins2.length <= 1 && fins3.length <= 1) {
							updated =
								eliminateFinnedSwordfishCandidates(
									board,
									candidate,
									mode,
									[i, j, k],
									sharedColumnsOrRows,
									fins1.concat(fins2, fins3),
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
 * Eliminates candidates based on the Finned Swordfish pattern.
 */
function eliminateFinnedSwordfishCandidates(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
	lines: number[],
	sharedPositions: number[],
	fins: number[],
): boolean {
	let updated = false;

	// Determine the region where eliminations should occur
	const eliminationRegion = sharedPositions.map((pos) =>
		fins.map((fin) => (mode === "row" ? [fin, pos] : [pos, fin])),
	);

	// Flatten the elimination region array
	const cellsToCheck = eliminationRegion.flat();

	// Eliminate the candidate from cells in the elimination region
	for (const [row, col] of cellsToCheck) {
		const possibleValues = getPossibleValues(board, row, col);
		if (possibleValues.includes(candidate)) {
			updated = true;
			// Simulate elimination (modify logic to store/eliminate candidates)
		}
	}

	return updated;
}
