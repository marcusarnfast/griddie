import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: WXYZ-Wing
 * Identifies and resolves patterns where four interconnected cells share candidates.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyWXYZWing(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all cells to find the WXYZ pivot
	for (let pivotRow = 0; pivotRow < 9; pivotRow++) {
		for (let pivotCol = 0; pivotCol < 9; pivotCol++) {
			const pivotCandidates = getPossibleValues(board, pivotRow, pivotCol);

			// Pivot must have 3 or 4 candidates
			if (pivotCandidates.length >= 3 && pivotCandidates.length <= 4) {
				updated =
					findAndEliminateWXYZWing(
						board,
						pivotRow,
						pivotCol,
						pivotCandidates,
					) || updated;
			}
		}
	}

	return updated;
}

/**
 * Finds and eliminates candidates based on the WXYZ-Wing pattern.
 */
function findAndEliminateWXYZWing(
	board: SudokuBoard,
	pivotRow: number,
	pivotCol: number,
	pivotCandidates: number[],
): boolean {
	let updated = false;

	// Find three wing cells connected to the pivot
	const wings = findConnectedCells(board, pivotRow, pivotCol, pivotCandidates);
	if (wings.length < 3) return false;

	// Check combinations of wings for the WXYZ-Wing pattern
	for (let i = 0; i < wings.length - 2; i++) {
		for (let j = i + 1; j < wings.length - 1; j++) {
			for (let k = j + 1; k < wings.length; k++) {
				const combinedCandidates = new Set([
					...pivotCandidates,
					...wings[i].candidates,
					...wings[j].candidates,
					...wings[k].candidates,
				]);

				// Ensure WXYZ condition: combined candidates are exactly 4
				if (combinedCandidates.size === 4) {
					updated =
						eliminateWXYZCandidates(
							board,
							pivotRow,
							pivotCol,
							[wings[i].row, wings[i].col],
							[wings[j].row, wings[j].col],
							[wings[k].row, wings[k].col],
							combinedCandidates,
						) || updated;
				}
			}
		}
	}

	return updated;
}

/**
 * Eliminates candidates based on the WXYZ-Wing logic.
 */
function eliminateWXYZCandidates(
	board: SudokuBoard,
	pivotRow: number,
	pivotCol: number,
	wing1: [number, number],
	wing2: [number, number],
	wing3: [number, number],
	combinedCandidates: Set<number>,
): boolean {
	let updated = false;

	// Find cells affected by the WXYZ-Wing
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				!(
					(row === pivotRow && col === pivotCol) ||
					(row === wing1[0] && col === wing1[1]) ||
					(row === wing2[0] && col === wing2[1]) ||
					(row === wing3[0] && col === wing3[1])
				) &&
				sharesRegionWithCells(row, col, [
					[pivotRow, pivotCol],
					wing1,
					wing2,
					wing3,
				])
			) {
				const possibleValues = getPossibleValues(board, row, col);
				for (const candidate of possibleValues) {
					if (combinedCandidates.has(candidate)) {
						updated = true;
						// Simulate elimination (modify logic to store/eliminate candidates)
					}
				}
			}
		}
	}

	return updated;
}

/**
 * Finds cells connected to a given pivot that share candidates.
 */
function findConnectedCells(
	board: SudokuBoard,
	pivotRow: number,
	pivotCol: number,
	pivotCandidates: number[],
): { row: number; col: number; candidates: number[] }[] {
	const connectedCells: { row: number; col: number; candidates: number[] }[] =
		[];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				(row !== pivotRow || col !== pivotCol) &&
				board[row][col] === 0 &&
				sharesCommonRegion(row, col, pivotRow, pivotCol)
			) {
				const cellCandidates = getPossibleValues(board, row, col);
				if (
					pivotCandidates.some((candidate) =>
						cellCandidates.includes(candidate),
					)
				) {
					connectedCells.push({ row, col, candidates: cellCandidates });
				}
			}
		}
	}

	return connectedCells;
}

/**
 * Determines if a cell shares a region with any of a set of cells.
 */
function sharesRegionWithCells(
	row: number,
	col: number,
	cells: [number, number][],
): boolean {
	return cells.some(([cRow, cCol]) => sharesCommonRegion(row, col, cRow, cCol));
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
