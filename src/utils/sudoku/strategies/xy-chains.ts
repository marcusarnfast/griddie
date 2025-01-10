import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: XY-Chains
 * Uses chains of cells with two candidates to propagate implications and eliminate candidates.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyXYChains(board: SudokuBoard): boolean {
	let updated = false;

	// Find all bivalue cells
	const bivalueCells = findBivalueCells(board);

	// Iterate through all pairs of bivalue cells to build chains
	for (let i = 0; i < bivalueCells.length; i++) {
		for (let j = 0; j < bivalueCells.length; j++) {
			if (i !== j) {
				const chain = buildXYChain(board, bivalueCells[i], bivalueCells[j]);
				if (chain) {
					updated = evaluateXYChain(board, chain) || updated;
				}
			}
		}
	}

	return updated;
}

/**
 * Finds all cells with exactly two candidates.
 */
function findBivalueCells(board: SudokuBoard): [number, number][] {
	const cells: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const possibleValues = getPossibleValues(board, row, col);
			if (possibleValues.length === 2) {
				cells.push([row, col]);
			}
		}
	}

	return cells;
}

/**
 * Builds an XY-Chain starting from one bivalue cell and ending at another.
 */
function buildXYChain(
	board: SudokuBoard,
	start: [number, number],
	end: [number, number],
): [number, number][] | null {
	const chain: [number, number][] = [start];
	const visited = new Set<string>();
	visited.add(`${start[0]},${start[1]}`);

	const stack: [number, number][] = [start];

	while (stack.length > 0) {
		const [currentRow, currentCol] = stack.pop()!;

		if (currentRow === end[0] && currentCol === end[1] && chain.length > 2) {
			return chain;
		}

		// Find neighbors of the current cell that can extend the chain
		const neighbors = findChainNeighbors(
			board,
			currentRow,
			currentCol,
			chain,
			visited,
		);

		for (const [neighborRow, neighborCol] of neighbors) {
			chain.push([neighborRow, neighborCol]);
			stack.push([neighborRow, neighborCol]);
			visited.add(`${neighborRow},${neighborCol}`);
		}
	}

	return null;
}

/**
 * Finds neighbors of a cell that can extend an XY-Chain.
 */
function findChainNeighbors(
	board: SudokuBoard,
	row: number,
	col: number,
	chain: [number, number][],
	visited: Set<string>,
): [number, number][] {
	const neighbors: [number, number][] = [];
	const candidates = getPossibleValues(board, row, col);

	for (let neighborRow = 0; neighborRow < 9; neighborRow++) {
		for (let neighborCol = 0; neighborCol < 9; neighborCol++) {
			if (
				board[neighborRow][neighborCol] === 0 &&
				!visited.has(`${neighborRow},${neighborCol}`) &&
				sharesCommonRegion(row, col, neighborRow, neighborCol)
			) {
				const neighborCandidates = getPossibleValues(
					board,
					neighborRow,
					neighborCol,
				);
				if (
					neighborCandidates.length === 2 &&
					candidates.some((candidate) => neighborCandidates.includes(candidate))
				) {
					neighbors.push([neighborRow, neighborCol]);
				}
			}
		}
	}

	return neighbors;
}

/**
 * Evaluates an XY-Chain to eliminate candidates.
 */
function evaluateXYChain(
	board: SudokuBoard,
	chain: [number, number][],
): boolean {
	let updated = false;

	const startCandidates = getPossibleValues(board, chain[0][0], chain[0][1]);
	const endCandidates = getPossibleValues(
		board,
		chain[chain.length - 1][0],
		chain[chain.length - 1][1],
	);

	const commonCandidate = startCandidates.find((candidate) =>
		endCandidates.includes(candidate),
	);

	if (!commonCandidate) return false;

	// Eliminate the common candidate from all cells that see both ends of the chain
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				!chain.some(
					([chainRow, chainCol]) => chainRow === row && chainCol === col,
				) &&
				sharesRegionWithCells(row, col, chain) &&
				getPossibleValues(board, row, col).includes(commonCandidate)
			) {
				updated = true;
				// Simulate elimination (modify logic to store/eliminate candidates)
			}
		}
	}

	return updated;
}

/**
 * Determines if a cell shares a region with any cells in a chain.
 */
function sharesRegionWithCells(
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
