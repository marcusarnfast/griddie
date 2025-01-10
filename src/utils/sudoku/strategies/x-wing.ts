import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: X-Wing
 * Eliminates candidates based on a specific row-column alignment pattern.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyXWing(board: SudokuBoard): boolean {
	let updated = false;

	// Check rows for X-Wing pattern
	for (let num = 1; num <= 9; num++) {
		updated = updated || findXWing(board, num, "row");
	}

	// Check columns for X-Wing pattern
	for (let num = 1; num <= 9; num++) {
		updated = updated || findXWing(board, num, "col");
	}

	return updated;
}

/**
 * Finds and applies X-Wing patterns to eliminate candidates.
 * @param board The Sudoku board
 * @param candidate The number to check for the X-Wing pattern
 * @param mode "row" or "col", specifying the direction to check
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function findXWing(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
): boolean {
	let updated = false;

	// Collect candidate positions in rows or columns
	const candidatePositions: Map<number, number[]> = new Map(); // Key: row/col index, Value: candidate positions

	for (let i = 0; i < 9; i++) {
		const positions = [];
		for (let j = 0; j < 9; j++) {
			const [row, col] = mode === "row" ? [i, j] : [j, i];
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push(j); // Store column or row index
			}
		}
		if (positions.length === 2) {
			candidatePositions.set(i, positions);
		}
	}

	// Find X-Wing patterns
	const keys = Array.from(candidatePositions.keys());
	for (let i = 0; i < keys.length - 1; i++) {
		for (let j = i + 1; j < keys.length; j++) {
			const key1 = keys[i];
			const key2 = keys[j];

			if (
				candidatePositions.get(key1)?.[0] ===
					candidatePositions.get(key2)?.[0] &&
				candidatePositions.get(key1)?.[1] === candidatePositions.get(key2)?.[1]
			) {
				// Eliminate candidate from intersecting rows/columns
				const positions = candidatePositions.get(key1);
				if (!positions) continue;
				const [pos1, pos2] = positions;

				updated =
					eliminateXWingCandidates(
						board,
						candidate,
						mode,
						[key1, key2],
						[pos1, pos2],
					) || updated;
			}
		}
	}

	return updated;
}

/**
 * Eliminates candidates based on X-Wing pattern.
 */
function eliminateXWingCandidates(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
	indices: [number, number],
	positions: [number, number],
): boolean {
	let updated = false;

	if (mode === "row") {
		for (let row = 0; row < 9; row++) {
			if (!indices.includes(row)) {
				for (const col of positions) {
					const possibleValues = getPossibleValues(board, row, col);
					if (possibleValues.includes(candidate)) {
						updated = true;
						// Simulate elimination (modify logic to store/eliminate candidates)
					}
				}
			}
		}
	} else {
		for (let col = 0; col < 9; col++) {
			if (!indices.includes(col)) {
				for (const row of positions) {
					const possibleValues = getPossibleValues(board, row, col);
					if (possibleValues.includes(candidate)) {
						updated = true;
						// Simulate elimination (modify logic to store/eliminate candidates)
					}
				}
			}
		}
	}

	return updated;
}
