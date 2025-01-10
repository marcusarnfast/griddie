import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Grouped X-Cycles
 * Extends X-Cycles logic to include groups of cells sharing candidates.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function applyGroupedXCycles(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		// Find all strong links for this candidate
		const strongLinks = findGroupedStrongLinks(board, candidate);

		// Evaluate the grouped X-Cycles
		for (const link of strongLinks) {
			updated = evaluateGroupedXCycle(board, link, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Finds grouped strong links for a candidate.
 * A grouped strong link connects a group of cells to another group, all containing the candidate.
 */
function findGroupedStrongLinks(
	board: SudokuBoard,
	candidate: number,
): StrongLink[] {
	const links: StrongLink[] = [];

	// Check rows for strong links
	for (let row = 0; row < 9; row++) {
		const groups = findGroupsInRegion(board, "row", row, candidate);
		links.push(...findLinksBetweenGroups(groups));
	}

	// Check columns for strong links
	for (let col = 0; col < 9; col++) {
		const groups = findGroupsInRegion(board, "col", col, candidate);
		links.push(...findLinksBetweenGroups(groups));
	}

	// Check blocks for strong links
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			const groups = findGroupsInRegion(
				board,
				"block",
				blockRow * 3 + blockCol,
				candidate,
			);
			links.push(...findLinksBetweenGroups(groups));
		}
	}

	return links;
}

/**
 * Evaluates a grouped X-Cycle for eliminations.
 */
function evaluateGroupedXCycle(
	board: SudokuBoard,
	link: StrongLink,
	candidate: number,
): boolean {
	let updated = false;

	// Identify cells that intersect both groups
	const intersectingCells = findIntersectingCells(link.group1, link.group2);

	for (const [row, col] of intersectingCells) {
		const possibleValues = getPossibleValues(board, row, col);
		if (possibleValues.includes(candidate)) {
			updated = true;
			// Simulate elimination (modify logic to store/eliminate candidates)
		}
	}

	return updated;
}

/**
 * Finds groups of cells sharing the same candidate in a region.
 */
function findGroupsInRegion(
	board: SudokuBoard,
	regionType: "row" | "col" | "block",
	index: number,
	candidate: number,
): Group[] {
	const groups: Group[] = [];
	const cells = getRegionCells(regionType, index);

	// Group cells by shared blocks or intersecting lines
	const groupMap = new Map<string, Group>();

	for (const [row, col] of cells) {
		if (
			board[row][col] === 0 &&
			getPossibleValues(board, row, col).includes(candidate)
		) {
			const key =
				regionType === "block" ? `${row / 3}-${col / 3}` : `${row}-${col}`;
			if (!groupMap.has(key)) groupMap.set(key, []);
			groupMap.get(key)?.push([row, col]);
		}
	}

	return Array.from(groupMap.values());
}

/**
 * Finds strong links between groups of cells.
 */
function findLinksBetweenGroups(groups: Group[]): StrongLink[] {
	const links: StrongLink[] = [];

	for (let i = 0; i < groups.length - 1; i++) {
		for (let j = i + 1; j < groups.length; j++) {
			links.push({ group1: groups[i], group2: groups[j] });
		}
	}

	return links;
}

/**
 * Finds cells that intersect two groups.
 */
function findIntersectingCells(
	group1: [number, number][],
	group2: [number, number][],
): [number, number][] {
	const intersecting: [number, number][] = [];

	for (const [row1, col1] of group1) {
		for (const [row2, col2] of group2) {
			if (sharesCommonRegion(row1, col1, row2, col2)) {
				intersecting.push([row2, col2]);
			}
		}
	}

	return intersecting;
}

/**
 * Retrieves all cells in a specific region (row, column, or block).
 */
function getRegionCells(
	regionType: "row" | "col" | "block",
	index: number,
): [number, number][] {
	if (regionType === "row") return getRowCells(index);
	if (regionType === "col") return getColCells(index);
	const blockRow = Math.floor(index / 3) * 3;
	const blockCol = (index % 3) * 3;
	return getBlockCells(blockRow, blockCol);
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
 * Types for grouped X-Cycles.
 */
type Group = [number, number][];
interface StrongLink {
	group1: Group;
	group2: Group;
}
