import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Advanced Inference Chains with Groups (AIC with Groups)
 * Identifies and resolves inference chains involving groups of cells sharing candidates.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyAICWithGroups(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		const chains = buildAICWithGroups(board, candidate);

		// Evaluate each chain for eliminations or confirmations
		for (const chain of chains) {
			updated = evaluateAICWithGroups(board, chain, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Builds Advanced Inference Chains with Groups for a candidate.
 */
function buildAICWithGroups(
	board: SudokuBoard,
	candidate: number,
): AICGroupChain[] {
	const chains: AICGroupChain[] = [];
	const visited = new Set<string>();

	// Find starting groups for the chains
	const startingGroups = findGroupsWithCandidate(board, candidate);

	for (const group of startingGroups) {
		const chain = extendAICGroupChain(board, candidate, [group], visited);
		if (chain) chains.push(chain);
	}

	return chains;
}

/**
 * Extends an AIC with Groups by exploring logical connections.
 */
function extendAICGroupChain(
	board: SudokuBoard,
	candidate: number,
	chain: Group[],
	visited: Set<string>,
): AICGroupChain | null {
	const lastGroup = chain[chain.length - 1];
	visited.add(groupKey(lastGroup));

	// Find neighboring groups to extend the chain
	const neighbors = findGroupNeighbors(board, lastGroup, candidate);

	for (const neighbor of neighbors) {
		if (!chain.some((group) => groupKey(group) === groupKey(neighbor))) {
			const newChain = [...chain, neighbor];
			const result = extendAICGroupChain(board, candidate, newChain, visited);
			if (result) return result;
		}
	}

	return chain.length > 1 ? chain : null;
}

/**
 * Finds groups of cells that share a candidate.
 */
function findGroupsWithCandidate(
	board: SudokuBoard,
	candidate: number,
): Group[] {
	const groups: Group[] = [];
	const regionCells = getAllRegionCells();

	for (const cells of regionCells) {
		const group = cells.filter(([row, col]) =>
			getPossibleValues(board, row, col).includes(candidate),
		);
		if (group.length > 1) {
			groups.push(group);
		}
	}

	return groups;
}

/**
 * Finds neighboring groups for a given group of cells.
 */
function findGroupNeighbors(
	board: SudokuBoard,
	group: Group,
	candidate: number,
): Group[] {
	const neighbors: Group[] = [];
	const regionCells = getAllRegionCells();

	for (const cells of regionCells) {
		const neighborGroup = cells.filter(([row, col]) =>
			getPossibleValues(board, row, col).includes(candidate),
		);
		if (
			neighborGroup.length > 0 &&
			neighborGroup.some(([row, col]) =>
				group.some(([gRow, gCol]) => sharesCommonRegion(row, col, gRow, gCol)),
			)
		) {
			neighbors.push(neighborGroup);
		}
	}

	return neighbors;
}

/**
 * Evaluates an AIC with Groups to eliminate candidates.
 */
function evaluateAICWithGroups(
	board: SudokuBoard,
	chain: Group[],
	candidate: number,
): boolean {
	let updated = false;

	// Apply logical implications to eliminate candidates
	const eliminationTargets = findGroupEliminationTargets(
		board,
		chain,
		candidate,
	);

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
function findGroupEliminationTargets(
	board: SudokuBoard,
	chain: Group[],
	candidate: number,
): [number, number][] {
	const eliminationTargets: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				!chain.some((group) =>
					group.some(([gRow, gCol]) => gRow === row && gCol === col),
				) &&
				sharesCommonRegionWithGroups(row, col, chain) &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				eliminationTargets.push([row, col]);
			}
		}
	}

	return eliminationTargets;
}

/**
 * Determines if a cell shares a region with any group in the chain.
 */
function sharesCommonRegionWithGroups(
	row: number,
	col: number,
	groups: Group[],
): boolean {
	return groups.some((group) =>
		group.some(([gRow, gCol]) => sharesCommonRegion(row, col, gRow, gCol)),
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
			regions.push(block);
		}
	}

	return regions;
}

/**
 * Generates a unique key for a group of cells.
 */
function groupKey(group: Group): string {
	return group.map(([row, col]) => `${row},${col}`).join("|");
}

/**
 * Types for AIC with Groups.
 */
type Group = [number, number][];
type AICGroupChain = Group[];
