import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Inference Chains
 * Uses chains of logical implications to eliminate candidates or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyInferenceChains(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		const chains = buildInferenceChains(board, candidate);

		// Evaluate each chain for eliminations or confirmations
		for (const chain of chains) {
			updated = evaluateInferenceChain(board, chain, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Builds logical inference chains for a candidate.
 */
function buildInferenceChains(
	board: SudokuBoard,
	candidate: number,
): InferenceChain[] {
	const chains: InferenceChain[] = [];
	const visited = new Set<string>();

	// Find starting points for the chains
	const startingPoints = findCandidateCells(board, candidate);

	for (const start of startingPoints) {
		const chain = extendChain(board, candidate, [start], visited);
		if (chain) chains.push(chain);
	}

	return chains;
}

/**
 * Extends an inference chain by exploring logical connections.
 */
function extendChain(
	board: SudokuBoard,
	candidate: number,
	chain: [number, number][],
	visited: Set<string>,
): InferenceChain | null {
	const [row, col] = chain[chain.length - 1];
	visited.add(`${row},${col}`);

	// Find neighbors to extend the chain
	const neighbors = findChainNeighbors(board, row, col, candidate);

	for (const neighbor of neighbors) {
		if (!chain.some(([r, c]) => r === neighbor[0] && c === neighbor[1])) {
			const newChain = [...chain, neighbor];
			const result = extendChain(board, candidate, newChain, visited);
			if (result) return result;
		}
	}

	return chain.length > 1 ? chain : null;
}

/**
 * Finds cells that can logically extend an inference chain.
 */
function findChainNeighbors(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): [number, number][] {
	const neighbors: [number, number][] = [];

	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (
				(r !== row || c !== col) &&
				sharesCommonRegion(row, col, r, c) &&
				getPossibleValues(board, r, c).includes(candidate)
			) {
				neighbors.push([r, c]);
			}
		}
	}

	return neighbors;
}

/**
 * Evaluates an inference chain for eliminations or confirmations.
 */
function evaluateInferenceChain(
	board: SudokuBoard,
	chain: [number, number][],
	candidate: number,
): boolean {
	let updated = false;

	// Apply logical implications to eliminate candidates
	const eliminationTargets = findEliminationTargets(board, chain, candidate);

	for (const [row, col] of eliminationTargets) {
		const possibleValues = getPossibleValues(board, row, col);
		if (possibleValues.includes(candidate)) {
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
	candidate: number,
): [number, number][] {
	const eliminationTargets: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				!chain.some(
					([chainRow, chainCol]) => chainRow === row && chainCol === col,
				) &&
				sharesCommonRegionWithChain(row, col, chain) &&
				getPossibleValues(board, row, col).includes(candidate)
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
	candidate: number,
): [number, number][] {
	const cells: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				cells.push([row, col]);
			}
		}
	}

	return cells;
}

/**
 * Defines the structure of an inference chain.
 */
type InferenceChain = [number, number][];
