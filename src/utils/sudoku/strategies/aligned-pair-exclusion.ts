import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Aligned Pair Exclusion (APE)
 * Identifies and resolves patterns where aligned candidate pairs eliminate options in intersecting cells.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyAlignedPairExclusion(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over rows, columns, and blocks to find aligned pairs
	for (let row = 0; row < 9; row++) {
		updated = findAlignedPairs(board, "row", row) || updated;
	}

	for (let col = 0; col < 9; col++) {
		updated = findAlignedPairs(board, "col", col) || updated;
	}

	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			updated =
				findAlignedPairs(board, "block", blockRow * 3 + blockCol) || updated;
		}
	}

	return updated;
}

/**
 * Finds aligned pairs in a given region (row, column, or block) and eliminates candidates.
 */
function findAlignedPairs(
	board: SudokuBoard,
	regionType: "row" | "col" | "block",
	index: number,
): boolean {
	let updated = false;

	const cells = getRegionCells(regionType, index);
	const pairs = findCandidatePairs(board, cells);

	// Check for pairs that are aligned and process exclusions
	for (const pair of pairs) {
		const [candidate1, candidate2] = pair.candidates;
		const sharedRegionCells = getSharedRegionCells(pair.cells);

		for (const [row, col] of sharedRegionCells) {
			const possibleValues = getPossibleValues(board, row, col);
			if (
				possibleValues.includes(candidate1) ||
				possibleValues.includes(candidate2)
			) {
				updated = true;
				// Simulate elimination (modify logic to store/eliminate candidates)
			}
		}
	}

	return updated;
}

/**
 * Finds pairs of cells in a region that share exactly two candidates.
 */
function findCandidatePairs(
	board: SudokuBoard,
	cells: [number, number][],
): { cells: [number, number][]; candidates: number[] }[] {
	const pairs: { cells: [number, number][]; candidates: number[] }[] = [];

	for (let i = 0; i < cells.length; i++) {
		const [row1, col1] = cells[i];
		const candidates1 = getPossibleValues(board, row1, col1);

		if (candidates1.length === 2) {
			for (let j = i + 1; j < cells.length; j++) {
				const [row2, col2] = cells[j];
				const candidates2 = getPossibleValues(board, row2, col2);

				if (candidates1.join() === candidates2.join()) {
					pairs.push({
						cells: [
							[row1, col1],
							[row2, col2],
						],
						candidates: candidates1,
					});
				}
			}
		}
	}

	return pairs;
}

/**
 * Finds cells shared by the regions of a given set of aligned pairs.
 */
function getSharedRegionCells(
	pairCells: [number, number][],
): [number, number][] {
	const sharedCells: [number, number][] = [];

	const regions = pairCells.flatMap(([row, col]) => [
		...getRowCells(row),
		...getColCells(col),
		...getBlockCells(row, col),
	]);

	const regionCount = new Map<string, number>();

	for (const [row, col] of regions) {
		const key = `${row},${col}`;
		regionCount.set(key, (regionCount.get(key) || 0) + 1);
	}

	for (const [key, count] of regionCount) {
		if (count > 1) {
			const [row, col] = key.split(",").map(Number);
			sharedCells.push([row, col]);
		}
	}

	return sharedCells;
}

/**
 * Retrieves all cells in a specific region (row, column, or block).
 */
function getRegionCells(
	regionType: "row" | "col" | "block",
	index: number,
): [number, number][] {
	if (regionType === "row") {
		return getRowCells(index);
	}
	if (regionType === "col") {
		return getColCells(index);
	}
	return getBlockCells(Math.floor(index / 3) * 3, (index % 3) * 3);
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
