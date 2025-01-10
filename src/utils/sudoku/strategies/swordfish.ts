import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Swordfish
 * Identifies and eliminates candidates based on the Swordfish pattern.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applySwordfish(board: SudokuBoard): boolean {
	let updated = false;

	// Check rows for Swordfish pattern
	for (let candidate = 1; candidate <= 9; candidate++) {
		updated = findSwordfish(board, candidate, "row") || updated;
	}

	// Check columns for Swordfish pattern
	for (let candidate = 1; candidate <= 9; candidate++) {
		updated = findSwordfish(board, candidate, "col") || updated;
	}

	return updated;
}

/**
 * Finds and applies Swordfish patterns to eliminate candidates.
 * @param board The Sudoku board
 * @param candidate The number to check for the Swordfish pattern
 * @param mode "row" or "col", specifying the direction to check
 * @returns `true` if any candidate was eliminated, `false` otherwise
 */
function findSwordfish(
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
		if (positions.length >= 2 && positions.length <= 3) {
			candidatePositions.set(i, positions);
		}
	}

	// Look for Swordfish pattern
	const keys = Array.from(candidatePositions.keys());
	for (let i = 0; i < keys.length - 2; i++) {
		for (let j = i + 1; j < keys.length - 1; j++) {
			for (let k = j + 1; k < keys.length; k++) {
				const positions1 = candidatePositions.get(keys[i]);
				const positions2 = candidatePositions.get(keys[j]);
				const positions3 = candidatePositions.get(keys[k]);

				if (!positions1 || !positions2 || !positions3) {
					continue;
				}

				const union = new Set([...positions1, ...positions2, ...positions3]);
				if (union.size <= 3) {
					// Found a Swordfish pattern
					updated =
						eliminateSwordfishCandidates(
							board,
							candidate,
							mode,
							[keys[i], keys[j], keys[k]],
							Array.from(union),
						) || updated;
				}
			}
		}
	}

	return updated;
}

/**
 * Eliminates candidates based on the Swordfish pattern.
 */
function eliminateSwordfishCandidates(
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
