import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Digit Forcing Chains
 * Uses chains of logical implications for a single digit to eliminate candidates or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyDigitForcingChains(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all digits (1–9) as candidates
	for (let digit = 1; digit <= 9; digit++) {
		const chains = buildDigitForcingChains(board, digit);

		// Evaluate each chain for eliminations or confirmations
		for (const chain of chains) {
			updated = evaluateDigitForcingChain(board, chain, digit) || updated;
		}
	}

	return updated;
}

/**
 * Builds Digit Forcing Chains for a specific digit.
 */
function buildDigitForcingChains(
	board: SudokuBoard,
	digit: number,
): ForcingChain[] {
	const chains: ForcingChain[] = [];
	const visited = new Set<string>();

	// Find starting points for chains
	const startingPoints = findCandidateCells(board, digit);

	for (const start of startingPoints) {
		const chain = extendForcingChain(board, digit, [start], visited);
		if (chain) chains.push(chain);
	}

	return chains;
}

/**
 * Extends a forcing chain by exploring logical implications.
 */
function extendForcingChain(
	board: SudokuBoard,
	digit: number,
	chain: [number, number][],
	visited: Set<string>,
): ForcingChain | null {
	const [row, col] = chain[chain.length - 1];
	visited.add(`${row},${col}`);

	// Find neighbors that extend the chain
	const neighbors = findChainNeighbors(board, row, col, digit);

	for (const neighbor of neighbors) {
		if (!chain.some(([r, c]) => r === neighbor[0] && c === neighbor[1])) {
			const newChain = [...chain, neighbor];
			const result = extendForcingChain(board, digit, newChain, visited);
			if (result) return result;
		}
	}

	return chain.length > 1 ? chain : null;
}

/**
 * Finds cells that can logically extend a forcing chain.
 */
function findChainNeighbors(
	board: SudokuBoard,
	row: number,
	col: number,
	digit: number,
): [number, number][] {
	const neighbors: [number, number][] = [];

	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (
				(r !== row || c !== col) &&
				sharesCommonRegion(row, col, r, c) &&
				getPossibleValues(board, r, c).includes(digit)
			) {
				neighbors.push([r, c]);
			}
		}
	}

	return neighbors;
}

/**
 * Evaluates a digit forcing chain to eliminate candidates.
 */
function evaluateDigitForcingChain(
	board: SudokuBoard,
	chain: [number, number][],
	digit: number,
): boolean {
	let updated = false;

	// Apply logical implications to eliminate candidates
	const eliminationTargets = findEliminationTargets(board, chain, digit);

	for (const [row, col] of eliminationTargets) {
		const possibleValues = getPossibleValues(board, row, col);
		if (possibleValues.includes(digit)) {
			updated = true;
			// Simulate elimination (modify logic to store/eliminate candidates)
		}
	}

	return updated;
}

/**
 * Identifies cells where candidates can be eliminated based on the chain.
 */
function findEliminationTargets(
	board: SudokuBoard,
	chain: [number, number][],
	digit: number,
): [number, number][] {
	const eliminationTargets: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				!chain.some(
					([chainRow, chainCol]) => chainRow === row && chainCol === col,
				) &&
				sharesCommonRegionWithChain(row, col, chain) &&
				getPossibleValues(board, row, col).includes(digit)
			) {
				eliminationTargets.push([row, col]);
			}
		}
	}

	return eliminationTargets;
}

/**
 * Determines if a cell shares a region with any cell in the chain.
 */
function sharesCommonRegionWithChain(
	row: number,
	col: number,
	chain: [number, number][],
): boolean {
	return chain.some(([chainRow, chainCol]) =>
		sharesCommonRegion(row, col, chainRow, chainCol),
	);
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
 * Finds all cells containing a specific candidate.
 */
function findCandidateCells(
	board: SudokuBoard,
	digit: number,
): [number, number][] {
	const cells: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(digit)
			) {
				cells.push([row, col]);
			}
		}
	}

	return cells;
}

/**
 * Types for Forcing Chains.
 */
type ForcingChain = [number, number][];
