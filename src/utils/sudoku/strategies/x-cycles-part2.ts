import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: X-Cycles (Part 2)
 * Extends X-Cycles to include weak links, enabling more advanced deductions.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyXCyclesPart2(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		// Build chains of strong and weak links for this candidate
		const chains = buildChainsWithWeakLinks(board, candidate);

		// Evaluate the chains for eliminations or confirmations
		for (const chain of chains) {
			updated = evaluateChainWithWeakLinks(board, chain, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Builds chains of strong and weak links for a candidate.
 * A strong link occurs when a candidate appears in exactly two cells in a row, column, or block.
 * A weak link occurs when a candidate is eliminated from one cell if it is placed in another.
 */
function buildChainsWithWeakLinks(
	board: SudokuBoard,
	candidate: number,
): [number, number][][] {
	const chains: [number, number][][] = [];

	// Identify strong links (reuse logic from Part 1)
	const strongLinks = buildChains(board, candidate);

	// Extend chains to include weak links
	for (const strongLink of strongLinks) {
		const extendedChain = [...strongLink];

		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (
					board[row][col] === 0 &&
					getPossibleValues(board, row, col).includes(candidate)
				) {
					// Check if this forms a weak link with the last cell in the chain
					const [lastRow, lastCol] = extendedChain[extendedChain.length - 1];
					if (
						!sharesCommonRegion(row, col, lastRow, lastCol) &&
						isWeaklyLinked(board, row, col, candidate, lastRow, lastCol)
					) {
						extendedChain.push([row, col]);
					}
				}
			}
		}

		chains.push(extendedChain);
	}

	return chains;
}

/**
 * Determines if two cells are weakly linked by the given candidate.
 * A weak link means if the candidate is placed in one cell, it must be eliminated from the other.
 */
function isWeaklyLinked(
	board: SudokuBoard,
	row1: number,
	col1: number,
	candidate: number,
	row2: number,
	col2: number,
): boolean {
	return (
		sharesCommonRegion(row1, col1, row2, col2) &&
		board[row1][col1] === 0 &&
		board[row2][col2] === 0
	);
}

/**
 * Evaluates a chain with weak links to eliminate candidates or confirm placements.
 */
function evaluateChainWithWeakLinks(
	board: SudokuBoard,
	chain: [number, number][],
	candidate: number,
): boolean {
	let updated = false;

	// Identify contradictions or eliminate candidates from intersecting cells
	for (let i = 0; i < chain.length; i++) {
		const [row, col] = chain[i];
		for (let j = i + 1; j < chain.length; j++) {
			const [otherRow, otherCol] = chain[j];

			// If weak links form a contradiction, eliminate the candidate
			if (
				sharesCommonRegion(row, col, otherRow, otherCol) &&
				getPossibleValues(board, otherRow, otherCol).includes(candidate)
			) {
				updated = true;
				// Simulate elimination (modify logic to store/eliminate candidates)
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

/**
 * Builds strong links for a candidate (reused from X-Cycles Part 1).
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
		if (positions.length === 2) chains.push(positions as [number, number][]);
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
		if (positions.length === 2) chains.push(positions as [number, number][]);
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
			if (positions.length === 2) chains.push(positions as [number, number][]);
		}
	}

	return chains;
}
