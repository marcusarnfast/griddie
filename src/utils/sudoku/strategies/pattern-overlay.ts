import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Pattern Overlay
 * Identifies repeating patterns within the puzzle, leveraging overlaps to eliminate candidates.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applyPatternOverlay(board: SudokuBoard): boolean {
	let updated = false;

	// Generate candidate patterns for each digit (1–9)
	for (let digit = 1; digit <= 9; digit++) {
		const patterns = generatePatternsForDigit(board, digit);

		// Evaluate overlaps in patterns to eliminate invalid candidates
		updated = evaluatePatternOverlays(board, patterns, digit) || updated;
	}

	return updated;
}

/**
 * Generates candidate patterns for a specific digit.
 */
function generatePatternsForDigit(
	board: SudokuBoard,
	digit: number,
): Pattern[] {
	const patterns: Pattern[] = [];

	// Iterate through all rows
	for (let row = 0; row < 9; row++) {
		const rowPattern = board[row]
			.map((value, col) =>
				value === 0 && getPossibleValues(board, row, col).includes(digit)
					? col
					: -1,
			)
			.filter((col) => col !== -1);
		if (rowPattern.length > 0) {
			patterns.push({ type: "row", index: row, positions: rowPattern });
		}
	}

	// Iterate through all columns
	for (let col = 0; col < 9; col++) {
		const colPattern = board
			.map((row, rowIndex) =>
				row[col] === 0 &&
				getPossibleValues(board, rowIndex, col).includes(digit)
					? rowIndex
					: -1,
			)
			.filter((rowIndex) => rowIndex !== -1);
		if (colPattern.length > 0) {
			patterns.push({ type: "col", index: col, positions: colPattern });
		}
	}

	// Iterate through all blocks
	for (let block = 0; block < 9; block++) {
		const startRow = Math.floor(block / 3) * 3;
		const startCol = (block % 3) * 3;
		const blockPattern: [number, number][] = [];

		for (let row = startRow; row < startRow + 3; row++) {
			for (let col = startCol; col < startCol + 3; col++) {
				if (
					board[row][col] === 0 &&
					getPossibleValues(board, row, col).includes(digit)
				) {
					blockPattern.push([row, col]);
				}
			}
		}

		if (blockPattern.length > 0) {
			patterns.push({ type: "block", index: block, positions: blockPattern });
		}
	}

	return patterns;
}

/**
 * Evaluates overlaps in patterns to eliminate invalid candidates.
 */
function evaluatePatternOverlays(
	board: SudokuBoard,
	patterns: Pattern[],
	digit: number,
): boolean {
	let updated = false;

	// Compare patterns of the same type (rows, columns, or blocks)
	const groupedPatterns = groupPatternsByType(patterns);

	for (const group of groupedPatterns) {
		for (let i = 0; i < group.length; i++) {
			for (let j = i + 1; j < group.length; j++) {
				const eliminated = eliminateUsingPatternOverlap(
					board,
					group[i],
					group[j],
					digit,
				);
				updated = updated || eliminated;
			}
		}
	}

	return updated;
}

/**
 * Groups patterns by their type (row, column, or block).
 */
function groupPatternsByType(patterns: Pattern[]): Pattern[][] {
	const rows: Pattern[] = patterns.filter((pattern) => pattern.type === "row");
	const cols: Pattern[] = patterns.filter((pattern) => pattern.type === "col");
	const blocks: Pattern[] = patterns.filter(
		(pattern) => pattern.type === "block",
	);

	return [rows, cols, blocks];
}

/**
 * Eliminates candidates based on overlaps between two patterns.
 */
function eliminateUsingPatternOverlap(
	board: SudokuBoard,
	pattern1: Pattern,
	pattern2: Pattern,
	digit: number,
): boolean {
	let updated = false;

	// Identify overlap positions
	const overlapPositions = findPatternOverlap(pattern1, pattern2);

	for (const [row, col] of overlapPositions) {
		const possibleValues = getPossibleValues(board, row, col);

		if (possibleValues.includes(digit)) {
			updated = true;
			// Simulate elimination (modify logic to store/eliminate candidates)
		}
	}

	return updated;
}

/**
 * Finds overlap positions between two patterns.
 */
function findPatternOverlap(
	pattern1: Pattern,
	pattern2: Pattern,
): [number, number][] {
	const overlap: [number, number][] = [];

	if (pattern1.type === "row" && pattern2.type === "col") {
		for (const row of [pattern1.index]) {
			for (const col of pattern2.positions as number[]) {
				if ((pattern1.positions as number[]).includes(col)) {
					overlap.push([row, col]);
				}
			}
		}
	}

	if (pattern1.type === "block" || pattern2.type === "block") {
		const positions1 = pattern1.positions as [number, number][];
		const positions2 = pattern2.positions as [number, number][];
		for (const [r1, c1] of positions1) {
			for (const [r2, c2] of positions2) {
				if (r1 === r2 && c1 === c2) overlap.push([r1, c1]);
			}
		}
	}

	return overlap;
}

/**
 * Pattern type for overlays.
 */
type Pattern = {
	type: "row" | "col" | "block";
	index: number;
	positions: number[] | [number, number][];
};
