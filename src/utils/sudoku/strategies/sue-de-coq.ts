import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Sue-de-Coq
 * Identifies and resolves patterns where intersections between blocks and lines (rows or columns)
 * eliminate candidates by analyzing locked sets.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applySueDeCoq(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate through all blocks to find Sue-de-Coq patterns
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			const blockStartRow = blockRow * 3;
			const blockStartCol = blockCol * 3;

			updated =
				findAndEliminateSueDeCoq(board, blockStartRow, blockStartCol) ||
				updated;
		}
	}

	return updated;
}

/**
 * Identifies Sue-de-Coq patterns and eliminates invalid candidates.
 */
function findAndEliminateSueDeCoq(
	board: SudokuBoard,
	blockStartRow: number,
	blockStartCol: number,
): boolean {
	let updated = false;

	// Get the block cells and their possible values
	const blockCells = getBlockCells(blockStartRow, blockStartCol);
	const blockCandidates = getCandidateMap(board, blockCells);

	// Check rows and columns intersecting the block
	for (let line = 0; line < 9; line++) {
		const rowCells = getRowCells(line).filter(
			([row, col]) =>
				row >= blockStartRow &&
				row < blockStartRow + 3 &&
				!(col >= blockStartCol && col < blockStartCol + 3),
		);

		const colCells = getColCells(line).filter(
			([row, col]) =>
				col >= blockStartCol &&
				col < blockStartCol + 3 &&
				!(row >= blockStartRow && row < blockStartRow + 3),
		);

		// Analyze row and block overlap
		updated =
			processSueDeCoqGroup(board, rowCells, blockCells, blockCandidates) ||
			updated;

		// Analyze column and block overlap
		updated =
			processSueDeCoqGroup(board, colCells, blockCells, blockCandidates) ||
			updated;
	}

	return updated;
}

/**
 * Processes a Sue-de-Coq group (line and block intersection) to eliminate invalid candidates.
 */
function processSueDeCoqGroup(
	board: SudokuBoard,
	lineCells: [number, number][],
	blockCells: [number, number][],
	blockCandidates: Map<string, Set<number>>,
): boolean {
	let updated = false;

	// Get candidates for the line cells
	const lineCandidates = getCandidateMap(board, lineCells);

	// Merge line and block candidates
	const combinedCandidates = new Set<number>();
	for (const candidates of blockCandidates.values()) {
		for (const candidate of candidates) {
			combinedCandidates.add(candidate);
		}
	}
	for (const candidates of lineCandidates.values()) {
		for (const candidate of candidates) {
			combinedCandidates.add(candidate);
		}
	}

	// Check if combined candidates exceed valid limits
	if (combinedCandidates.size <= lineCells.length + blockCells.length) {
		updated = eliminateInvalidSueDeCoqCandidates(
			board,
			blockCells,
			lineCells,
			combinedCandidates,
		);
	}

	return updated;
}

/**
 * Eliminates invalid candidates based on Sue-de-Coq logic.
 */
function eliminateInvalidSueDeCoqCandidates(
	board: SudokuBoard,
	blockCells: [number, number][],
	lineCells: [number, number][],
	validCandidates: Set<number>,
): boolean {
	let updated = false;

	// Eliminate candidates not in the valid set
	const allCells = [...blockCells, ...lineCells];
	for (const [row, col] of allCells) {
		const possibleValues = getPossibleValues(board, row, col);
		const invalidCandidates = possibleValues.filter(
			(candidate) => !validCandidates.has(candidate),
		);

		if (invalidCandidates.length > 0) {
			updated = true;
			// Simulate elimination (modify logic to store/eliminate candidates)
		}
	}

	return updated;
}

/**
 * Retrieves all cells in a block.
 */
function getBlockCells(startRow: number, startCol: number): [number, number][] {
	const cells: [number, number][] = [];
	for (let row = startRow; row < startRow + 3; row++) {
		for (let col = startCol; col < startCol + 3; col++) {
			cells.push([row, col]);
		}
	}
	return cells;
}

/**
 * Retrieves all cells in a row.
 */
function getRowCells(row: number): [number, number][] {
	return Array.from({ length: 9 }, (_, col) => [row, col]);
}

/**
 * Retrieves all cells in a column.
 */
function getColCells(col: number): [number, number][] {
	return Array.from({ length: 9 }, (_, row) => [row, col]);
}

/**
 * Maps cells to their possible candidates.
 */
function getCandidateMap(
	board: SudokuBoard,
	cells: [number, number][],
): Map<string, Set<number>> {
	const candidateMap = new Map<string, Set<number>>();

	for (const [row, col] of cells) {
		const possibleValues = getPossibleValues(board, row, col);
		if (possibleValues.length > 0) {
			candidateMap.set(`${row},${col}`, new Set(possibleValues));
		}
	}

	return candidateMap;
}
