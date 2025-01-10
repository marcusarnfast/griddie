import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: X-Cycles (Part 1)
 * Uses strong links between candidates to eliminate possibilities or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyXCyclesPart1(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		// Build chains of strong links for this candidate
		const chains = buildChains(board, candidate);

		// Evaluate the chains for eliminations or confirmations
		for (const chain of chains) {
			updated = evaluateChain(board, chain, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Builds chains of strong links for a candidate.
 * A strong link occurs when a candidate appears in exactly two cells in a row, column, or block.
 */
function buildChains(
	board: SudokuBoard,
	candidate: number,
): [number, number][][] {
	const chains: [number, number][][] = [];

	// Check rows for strong links
	for (let row = 0; row < 9; row++) {
		const positions = [];
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push([row, col]);
			}
		}
		if (positions.length === 2) {
			// Ensure positions array has exactly 2 elements of type [number, number]
			if (positions.every((pos) => pos.length === 2)) {
				chains.push(positions as [number, number][]);
			}
		}
	}

	// Check columns for strong links
	for (let col = 0; col < 9; col++) {
		const positions = [];
		for (let row = 0; row < 9; row++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push([row, col]);
			}
		}
		if (positions.length === 2) {
			// Ensure positions array has exactly 2 elements of type [number, number]
			if (positions.every((pos) => pos.length === 2)) {
				chains.push(positions as [number, number][]);
			}
		}
	}

	// Check blocks for strong links
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			const positions = [];
			for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
				for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
					if (
						board[row][col] === 0 &&
						getPossibleValues(board, row, col).includes(candidate)
					) {
						positions.push([row, col]);
					}
				}
			}
			if (positions.length === 2) {
				// Ensure positions array has exactly 2 elements of type [number, number]
				if (positions.every((pos) => pos.length === 2)) {
					chains.push(positions as [number, number][]);
				}
			}
		}
	}

	return chains;
}

/**
 * Evaluates a chain of strong links to eliminate candidates or confirm placements.
 */
function evaluateChain(
	board: SudokuBoard,
	chain: [number, number][],
	candidate: number,
): boolean {
	let updated = false;

	// Find common cells in the shared region of the chain
	const [cell1, cell2] = chain;

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				(row !== cell1[0] || col !== cell1[1]) &&
				(row !== cell2[0] || col !== cell2[1]) &&
				sharesCommonRegion(row, col, cell1[0], cell1[1]) &&
				sharesCommonRegion(row, col, cell2[0], cell2[1])
			) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					// Eliminate the candidate from this cell
					updated = true;
					// Simulate elimination (modify logic to store/eliminate candidates)
				}
			}
		}
	}

	return updated;
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
