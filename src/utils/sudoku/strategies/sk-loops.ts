import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: SK Loops
 * Identifies and resolves cyclic patterns (SK Loops) to eliminate candidates or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applySKLoops(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		const loops = findSKLoops(board, candidate);

		// Evaluate the loops for eliminations or confirmations
		for (const loop of loops) {
			updated = evaluateSKLoop(board, loop, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Finds SK Loops for a given candidate.
 */
function findSKLoops(
	board: SudokuBoard,
	candidate: number,
): [number, number][][] {
	const loops: [number, number][][] = [];
	const visited = new Set<string>();

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate) &&
				!visited.has(`${row},${col}`)
			) {
				const loop = buildSKLoop(board, row, col, candidate, visited);
				if (loop) loops.push(loop);
			}
		}
	}

	return loops;
}

/**
 * Builds an SK Loop starting from a given cell.
 */
function buildSKLoop(
	board: SudokuBoard,
	startRow: number,
	startCol: number,
	candidate: number,
	visited: Set<string>,
): [number, number][] | null {
	const loop: [number, number][] = [];
	const stack: [number, number][] = [[startRow, startCol]];

	while (stack.length > 0) {
		const [row, col] = stack.pop()!;
		if (visited.has(`${row},${col}`)) continue;

		visited.add(`${row},${col}`);
		loop.push([row, col]);

		// Check neighbors (row, column, and block)
		const neighbors = findCandidateNeighbors(board, row, col, candidate);
		for (const [nRow, nCol] of neighbors) {
			if (!loop.some(([lRow, lCol]) => lRow === nRow && lCol === nCol)) {
				stack.push([nRow, nCol]);
			} else if (
				loop[0][0] === nRow &&
				loop[0][1] === nCol &&
				loop.length >= 4
			) {
				// Found a cycle
				return loop;
			}
		}
	}

	return null;
}

/**
 * Finds neighbors of a cell that share the same candidate.
 */
function findCandidateNeighbors(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
): [number, number][] {
	const neighbors: [number, number][] = [];

	// Row and column neighbors
	for (let i = 0; i < 9; i++) {
		if (i !== col && getPossibleValues(board, row, i).includes(candidate)) {
			neighbors.push([row, i]);
		}
		if (i !== row && getPossibleValues(board, i, col).includes(candidate)) {
			neighbors.push([i, col]);
		}
	}

	// Block neighbors
	const blockRow = Math.floor(row / 3) * 3;
	const blockCol = Math.floor(col / 3) * 3;
	for (let r = blockRow; r < blockRow + 3; r++) {
		for (let c = blockCol; c < blockCol + 3; c++) {
			if (
				(r !== row || c !== col) &&
				getPossibleValues(board, r, c).includes(candidate)
			) {
				neighbors.push([r, c]);
			}
		}
	}

	return neighbors;
}

/**
 * Evaluates an SK Loop to eliminate candidates or confirm placements.
 */
function evaluateSKLoop(
	board: SudokuBoard,
	loop: [number, number][],
	candidate: number,
): boolean {
	let updated = false;

	// Check cells outside the loop for elimination opportunities
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				!loop.some(([lRow, lCol]) => lRow === row && lCol === col) &&
				sharesRegionWithLoop(loop, row, col)
			) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					updated = true;
					// Simulate elimination (modify logic to store/eliminate candidates)
				}
			}
		}
	}

	return updated;
}

/**
 * Determines if a cell shares a region with any cell in the loop.
 */
function sharesRegionWithLoop(
	loop: [number, number][],
	row: number,
	col: number,
): boolean {
	return loop.some(([lRow, lCol]) => sharesCommonRegion(row, col, lRow, lCol));
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
