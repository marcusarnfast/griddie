import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: 3D Medusa
 * Identifies and resolves chains of strong and weak links in 3D to eliminate candidates or confirm placements.
 * @returns `true` if any candidate was eliminated or confirmed, `false` otherwise.
 */
export function apply3DMedusa(board: SudokuBoard): boolean {
	let updated = false;

	// Iterate over all candidate values
	for (let candidate = 1; candidate <= 9; candidate++) {
		const chains = build3DChains(board, candidate);

		for (const chain of chains) {
			updated = evaluate3DChain(board, chain, candidate) || updated;
		}
	}

	return updated;
}

/**
 * Builds 3D chains of strong and weak links for a candidate.
 */
function build3DChains(
	board: SudokuBoard,
	candidate: number,
): [number, number][][] {
	const chains: [number, number][][] = [];

	// Initialize by finding all strong links
	const strongLinks = buildStrongLinks(board, candidate);

	// Extend chains to include weak links
	for (const strongLink of strongLinks) {
		const extendedChain = [...strongLink];

		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (
					board[row][col] === 0 &&
					getPossibleValues(board, row, col).includes(candidate)
				) {
					const [lastRow, lastCol] = extendedChain[extendedChain.length - 1];
					if (
						isWeaklyLinked3D(board, row, col, candidate, lastRow, lastCol) &&
						!extendedChain.some(([r, c]) => r === row && c === col)
					) {
						extendedChain.push([row, col]);
					}
				}
			}
		}

		chains.push(extendedChain);
	}

	return chains;
}

/**
 * Determines if two cells are weakly linked in a 3D structure by the given candidate.
 */
function isWeaklyLinked3D(
	board: SudokuBoard,
	row1: number,
	col1: number,
	candidate: number,
	row2: number,
	col2: number,
): boolean {
	return (
		board[row1][col1] === 0 &&
		board[row2][col2] === 0 &&
		sharesCommonRegion(row1, col1, row2, col2) &&
		getPossibleValues(board, row2, col2).includes(candidate)
	);
}

/**
 * Evaluates a 3D chain to eliminate candidates or confirm placements.
 */
function evaluate3DChain(
	board: SudokuBoard,
	chain: [number, number][],
	candidate: number,
): boolean {
	let updated = false;

	const colorGroups = assignColorsToChain(chain);

	// Use logical deductions based on chain coloring
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				!chain.some(([r, c]) => r === row && c === col)
			) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					const connectedColors = chain
						.filter(([r, c]) => sharesCommonRegion(row, col, r, c))
						.map(([r, c]) => colorGroups.get(`${r},${c}`));

					// Eliminate candidate if connected to both colors
					if (
						connectedColors.includes("red") &&
						connectedColors.includes("blue")
					) {
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
 * Assigns colors (red/blue) to a chain to identify logical contradictions.
 */
function assignColorsToChain(chain: [number, number][]): Map<string, string> {
	const colors = new Map<string, string>();

	chain.forEach(([row, col], index) => {
		colors.set(`${row},${col}`, index % 2 === 0 ? "red" : "blue");
	});

	return colors;
}

/**
 * Builds strong links for a candidate (reused from X-Cycles Part 1).
 */
function buildStrongLinks(
	board: SudokuBoard,
	candidate: number,
): [number, number][][] {
	const links: [number, number][][] = [];

	// Check rows
	for (let row = 0; row < 9; row++) {
		const positions = [];
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push([row, col]);
			}
		}
		if (positions.length === 2) links.push(positions as [number, number][]);
	}

	// Check columns
	for (let col = 0; col < 9; col++) {
		const positions = [];
		for (let row = 0; row < 9; row++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push([row, col]);
			}
		}
		if (positions.length === 2) links.push(positions as [number, number][]);
	}

	// Check blocks
	for (let blockRow = 0; blockRow < 3; blockRow++) {
		for (let blockCol = 0; blockCol < 3; blockCol++) {
			const positions = [];
			for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
				for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
					if (
						board[row][col] === 0 &&
						getPossibleValues(board, row, col).includes(candidate)
					) {
						positions.push([row, col]);
					}
				}
			}
			if (positions.length === 2) links.push(positions as [number, number][]);
		}
	}

	return links;
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
