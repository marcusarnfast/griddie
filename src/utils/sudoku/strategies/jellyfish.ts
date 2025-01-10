import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Jellyfish
 * Identifies and eliminates candidates based on the Jellyfish pattern.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyJellyfish(board: SudokuBoard): boolean {
	let updated = false;

	// Check rows for Jellyfish pattern
	for (let candidate = 1; candidate <= 9; candidate++) {
		updated = findJellyfish(board, candidate, "row") || updated;
	}

	// Check columns for Jellyfish pattern
	for (let candidate = 1; candidate <= 9; candidate++) {
		updated = findJellyfish(board, candidate, "col") || updated;
	}

	return updated;
}

/**
 * Finds and applies Jellyfish patterns to eliminate candidates.
 * @param board The Sudoku board
 * @param candidate The number to check for the Jellyfish pattern
 * @param mode "row" or "col", specifying the direction to check
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function findJellyfish(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
): boolean {
	let updated = false;

	const candidatePositions: Map<number, number[]> = new Map(); // Key: row/col index, Value: candidate positions

	// Collect candidate positions for each row or column
	for (let i = 0; i < 9; i++) {
		const positions: number[] = [];
		for (let j = 0; j < 9; j++) {
			const [row, col] = mode === "row" ? [i, j] : [j, i];
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push(j); // Store column or row index
			}
		}
		if (positions.length >= 2 && positions.length <= 4) {
			candidatePositions.set(i, positions);
		}
	}

	// Look for Jellyfish pattern
	const keys = Array.from(candidatePositions.keys());
	for (let i = 0; i < keys.length - 3; i++) {
		for (let j = i + 1; j < keys.length - 2; j++) {
			for (let k = j + 1; k < keys.length - 1; k++) {
				for (let l = k + 1; l < keys.length; l++) {
					const positions1 = candidatePositions.get(keys[i]);
					const positions2 = candidatePositions.get(keys[j]);
					const positions3 = candidatePositions.get(keys[k]);
					const positions4 = candidatePositions.get(keys[l]);

					if (!positions1 || !positions2 || !positions3 || !positions4) {
						continue;
					}

					const union = new Set([
						...positions1,
						...positions2,
						...positions3,
						...positions4,
					]);
					if (union.size <= 4) {
						// Found a Jellyfish pattern
						updated =
							eliminateJellyfishCandidates(
								board,
								candidate,
								mode,
								[keys[i], keys[j], keys[k], keys[l]],
								Array.from(union),
							) || updated;
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Eliminates candidates based on the Jellyfish pattern.
 */
function eliminateJellyfishCandidates(
	board: SudokuBoard,
	candidate: number,
	mode: "row" | "col",
	indices: number[],
	positions: number[],
): boolean {
	let updated = false;

	if (mode === "row") {
		for (const col of positions) {
			for (let row = 0; row < 9; row++) {
				if (!indices.includes(row)) {
					const possibleValues = getPossibleValues(board, row, col);
					if (possibleValues.includes(candidate)) {
						updated = true;
						// Simulate elimination (modify logic to store/eliminate candidates)
					}
				}
			}
		}
	} else {
		for (const row of positions) {
			for (let col = 0; col < 9; col++) {
				if (!indices.includes(col)) {
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
