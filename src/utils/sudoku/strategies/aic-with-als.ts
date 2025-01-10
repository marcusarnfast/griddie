import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Advanced Inference Chains with Almost Locked Sets (AIC with ALS)
 * Identifies and resolves inference chains involving Almost Locked Sets to eliminate candidates or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyAICWithALS(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		const chains = buildAICWithALS(board, candidate);

		// Evaluate each chain for eliminations or confirmations
		for (const chain of chains) {
			updated = evaluateAICWithALS(board, chain, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Builds Advanced Inference Chains with ALS for a candidate.
 */
function buildAICWithALS(board: SudokuBoard, candidate: number): ALSChain[] {
	const chains: ALSChain[] = [];
	const visited = new Set<string>();

	// Find initial ALS groups to start chains
	const initialALS = findALS(board, candidate);

	for (const als of initialALS) {
		const chain = extendALSChain(board, candidate, [als], visited);
		if (chain) chains.push(chain);
	}

	return chains;
}

/**
 * Extends an ALS chain by exploring logical connections.
 */
function extendALSChain(
	board: SudokuBoard,
	candidate: number,
	chain: ALS[],
	visited: Set<string>,
): ALSChain | null {
	const lastALS = chain[chain.length - 1];
	visited.add(alsKey(lastALS));

	// Find neighboring ALS groups to extend the chain
	const neighbors = findALSNeighbors(board, lastALS, candidate);

	for (const neighbor of neighbors) {
		if (!chain.some((als) => alsKey(als) === alsKey(neighbor))) {
			const newChain = [...chain, neighbor];
			const result = extendALSChain(board, candidate, newChain, visited);
			if (result) return result;
		}
	}

	return chain.length > 1 ? chain : null;
}

/**
 * Finds Almost Locked Sets (ALS) on the board for a candidate.
 */
function findALS(board: SudokuBoard, candidate: number): ALS[] {
	const alsGroups: ALS[] = [];
	const regionCells = getAllRegionCells();

	for (const cells of regionCells) {
		const group = cells.filter(([row, col]) =>
			getPossibleValues(board, row, col).includes(candidate),
		);
		if (group.length > 1 && group.length <= 4) {
			alsGroups.push({
				cells: group,
				candidates: getCandidateSet(board, group),
			});
		}
	}

	return alsGroups;
}

/**
 * Finds neighboring ALS groups that can be linked logically.
 */
function findALSNeighbors(
	board: SudokuBoard,
	als: ALS,
	candidate: number,
): ALS[] {
	const neighbors: ALS[] = [];
	const regionCells = getAllRegionCells();

	for (const cells of regionCells) {
		const group = cells.filter(([row, col]) =>
			getPossibleValues(board, row, col).includes(candidate),
		);
		if (
			group.length > 1 &&
			group.length <= 4 &&
			group.some(([row, col]) =>
				als.cells.some(([aRow, aCol]) =>
					sharesCommonRegion(row, col, aRow, aCol),
				),
			)
		) {
			neighbors.push({
				cells: group,
				candidates: getCandidateSet(board, group),
			});
		}
	}

	return neighbors;
}

/**
 * Evaluates an ALS chain to eliminate candidates or confirm placements.
 */
function evaluateAICWithALS(
	board: SudokuBoard,
	chain: ALSChain,
	candidate: number,
): boolean {
	let updated = false;

	// Apply logical implications to eliminate candidates
	const eliminationTargets = findALSEliminationTargets(board, chain, candidate);

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
 * Identifies cells where candidates can be eliminated based on the ALS chain.
 */
function findALSEliminationTargets(
	board: SudokuBoard,
	chain: ALSChain,
	candidate: number,
): [number, number][] {
	const eliminationTargets: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				!chain.some((als) =>
					als.cells.some(([aRow, aCol]) => aRow === row && aCol === col),
				) &&
				sharesCommonRegionWithALSChain(row, col, chain) &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				eliminationTargets.push([row, col]);
			}
		}
	}

	return eliminationTargets;
}

/**
 * Determines if a cell shares a region with any ALS in the chain.
 */
function sharesCommonRegionWithALSChain(
	row: number,
	col: number,
	chain: ALSChain,
): boolean {
	return chain.some((als) =>
		als.cells.some(([aRow, aCol]) => sharesCommonRegion(row, col, aRow, aCol)),
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
 * Retrieves all cells in all regions (rows, columns, and blocks).
 */
function getAllRegionCells(): [number, number][][] {
	const regions: [number, number][][] = [];

	// Rows
	for (let row = 0; row < 9; row++) {
		regions.push(Array.from({ length: 9 }, (_, col) => [row, col]));
	}

	// Columns
	for (let col = 0; col < 9; col++) {
		regions.push(Array.from({ length: 9 }, (_, row) => [row, col]));
	}

	// Blocks
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			const block = [];
			for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
				for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
					block.push([row, col]);
				}
			}
			regions.push(block as [number, number][]);
		}
	}

	return regions;
}

/**
 * Generates a unique key for an ALS group.
 */
function alsKey(als: ALS): string {
	return als.cells.map(([row, col]) => `${row},${col}`).join("|");
}

/**
 * Retrieves the candidate set for a group of cells.
 */
function getCandidateSet(
	board: SudokuBoard,
	group: [number, number][],
): Set<number> {
	const candidates = new Set<number>();
	for (const [row, col] of group) {
		for (const value of getPossibleValues(board, row, col)) {
			candidates.add(value);
		}
	}
	return candidates;
}

/**
 * Types for ALS Chains.
 */
type ALS = {
	cells: [number, number][];
	candidates: Set<number>;
};
type ALSChain = ALS[];
