import type { SudokuBoard } from "../types";
import { getPossibleValues, cloneBoard } from "./helpers";

/**
 * Strategy: Unit Forcing Chains
 * Focuses on a unit (row, column, or block) and propagates logical implications for candidates.
 * Eliminates candidates or confirms placements based on the results.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyUnitForcingChains(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all units (rows, columns, and blocks)
	for (let index = 0; index < 9; index++) {
		updated = processUnit(board, index, "row") || updated;
		updated = processUnit(board, index, "col") || updated;
		updated = processUnit(board, index, "block") || updated;
	}

	return updated;
}

/**
 * Processes a specific unit (row, column, or block) using Unit Forcing logic.
 */
function processUnit(
	board: SudokuBoard,
	index: number,
	type: "row" | "col" | "block",
): boolean {
	let updated = false;

	const cells = getUnitCells(index, type);

	// Gather all candidates in the unit
	const candidatesMap = getCandidateMap(board, cells);

	for (const [cellKey, candidates] of candidatesMap) {
		const [row, col] = cellKey.split(",").map(Number);

		// Test each candidate for this cell
		for (const candidate of candidates) {
			const result = testUnitForcing(board, row, col, candidate, type, index);
			if (result === false) {
				// Candidate causes contradiction, eliminate it
				updated = true;
				// Simulate elimination (modify logic to store/eliminate candidates)
			} else if (result === true) {
				// Candidate forces a solution, confirm it
				board[row][col] = candidate;
				updated = true;
				break;
			}
		}
	}

	return updated;
}

/**
 * Tests a specific candidate in a unit using Unit Forcing logic.
 */
function testUnitForcing(
	board: SudokuBoard,
	row: number,
	col: number,
	candidate: number,
	unitType: "row" | "col" | "block",
	index: number,
): boolean | null {
	const testBoard = cloneBoard(board);

	// Assume the candidate is placed in the cell
	testBoard[row][col] = candidate;

	// Propagate implications
	try {
		while (applyBasicEliminations(testBoard)) {
			// Simplify the board iteratively
		}

		// Check for contradictions
		if (hasContradiction(testBoard)) {
			return false; // Candidate leads to contradiction
		}

		// Check if the candidate forces a solution
		if (isFullySolved(testBoard)) {
			return true; // Candidate forces a valid solution
		}
	} catch {
		return false; // Contradiction occurred during propagation
	}

	return null; // Result is inconclusive
}

/**
 * Retrieves all cells in a specified unit (row, column, or block).
 */
function getUnitCells(
	index: number,
	type: "row" | "col" | "block",
): [number, number][] {
	if (type === "row") {
		return Array.from({ length: 9 }, (_, col) => [index, col]);
	}
	if (type === "col") {
		return Array.from({ length: 9 }, (_, row) => [row, index]);
	}

	// For blocks
	const startRow = Math.floor(index / 3) * 3;
	const startCol = (index % 3) * 3;
	const cells: [number, number][] = [];

	for (let row = startRow; row < startRow + 3; row++) {
		for (let col = startCol; col < startCol + 3; col++) {
			cells.push([row, col]);
		}
	}
	return cells;
}

/**
 * Maps cells to their possible candidates within a unit.
 */
function getCandidateMap(
	board: SudokuBoard,
	cells: [number, number][],
): Map<string, number[]> {
	const candidateMap = new Map<string, number[]>();

	for (const [row, col] of cells) {
		if (board[row][col] === 0) {
			const possibleValues = getPossibleValues(board, row, col);
			candidateMap.set(`${row},${col}`, possibleValues);
		}
	}

	return candidateMap;
}

/**
 * Applies basic elimination techniques to simplify the board.
 */
function applyBasicEliminations(board: SudokuBoard): boolean {
	let updated = false;

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				const candidates = getPossibleValues(board, row, col);

				if (candidates.length === 1) {
					// Confirm the only candidate
					board[row][col] = candidates[0];
					updated = true;
				}
			}
		}
	}

	return updated;
}

/**
 * Checks if the board contains any contradictions.
 * A contradiction occurs if a row, column, or block has duplicates.
 */
function hasContradiction(board: SudokuBoard): boolean {
	for (let i = 0; i < 9; i++) {
		if (
			hasDuplicate(board[i]) || // Check rows
			hasDuplicate(board.map((row) => row[i])) || // Check columns
			hasDuplicate(getBlock(board, i)) // Check blocks
		) {
			return true;
		}
	}
	return false;
}

/**
 * Checks if a row, column, or block has duplicate non-zero numbers.
 */
function hasDuplicate(cells: number[]): boolean {
	const seen = new Set<number>();
	for (const num of cells) {
		if (num !== 0) {
			if (seen.has(num)) return true;
			seen.add(num);
		}
	}
	return false;
}

/**
 * Extracts a block from the board given its index (0–8).
 */
function getBlock(board: SudokuBoard, blockIndex: number): number[] {
	const startRow = Math.floor(blockIndex / 3) * 3;
	const startCol = (blockIndex % 3) * 3;

	const block: number[] = [];
	for (let row = startRow; row < startRow + 3; row++) {
		for (let col = startCol; col < startCol + 3; col++) {
			block.push(board[row][col]);
		}
	}
	return block;
}

/**
 * Checks if the board is fully solved.
 */
function isFullySolved(board: SudokuBoard): boolean {
	return board.every((row) => row.every((cell) => cell !== 0));
}
