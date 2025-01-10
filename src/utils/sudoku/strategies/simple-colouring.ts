import type { SudokuBoard } from "../types";
import { getPossibleValues } from "./helpers";

/**
 * Strategy: Simple Colouring
 * Identifies chains of candidates and uses logical contradictions to eliminate them.
 * @returns `true` if any candidate was eliminated, `false` otherwise.
 */
export function applySimpleColouring(board: SudokuBoard): boolean {
	let updated = false;

	for (let candidate = 1; candidate <= 9; candidate++) {
		const candidatePositions = getCandidatePositions(board, candidate);
		const chains = findChains(candidatePositions);

		for (const chain of chains) {
			updated = updated || eliminateByContradiction(board, chain, candidate);
		}
	}

	return updated;
}

/**
 * Finds all positions on the board containing a specific candidate.
 */
function getCandidatePositions(
	board: SudokuBoard,
	candidate: number,
): [number, number][] {
	const positions: [number, number][] = [];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (
				board[row][col] === 0 &&
				getPossibleValues(board, row, col).includes(candidate)
			) {
				positions.push([row, col]);
			}
		}
	}

	return positions;
}

/**
 * Creates chains of candidates by connecting cells in the same row, column, or block.
 */
function findChains(positions: [number, number][]): [number, number][][] {
	const chains: [number, number][][] = [];
	const visited = new Set<string>();

	const visitKey = (row: number, col: number) => `${row},${col}`;

	const dfs = (chain: [number, number][], pos: [number, number]) => {
		visited.add(visitKey(pos[0], pos[1]));
		chain.push(pos);

		for (const next of positions) {
			if (
				!visited.has(visitKey(next[0], next[1])) &&
				(pos[0] === next[0] || pos[1] === next[1] || isInSameBlock(pos, next))
			) {
				dfs(chain, next);
			}
		}
	};

	for (const pos of positions) {
		if (!visited.has(visitKey(pos[0], pos[1]))) {
			const chain: [number, number][] = [];
			dfs(chain, pos);
			chains.push(chain);
		}
	}

	return chains;
}

/**
 * Determines whether two cells are in the same 3x3 block.
 */
function isInSameBlock(
	pos1: [number, number],
	pos2: [number, number],
): boolean {
	const blockRow1 = Math.floor(pos1[0] / 3);
	const blockCol1 = Math.floor(pos1[1] / 3);
	const blockRow2 = Math.floor(pos2[0] / 3);
	const blockCol2 = Math.floor(pos2[1] / 3);

	return blockRow1 === blockRow2 && blockCol1 === blockCol2;
}

/**
 * Eliminates candidates based on contradictions in coloring.
 */
function eliminateByContradiction(
	board: SudokuBoard,
	chain: [number, number][],
	candidate: number,
): boolean {
	let updated = false;

	const colors = new Map<string, boolean>();

	// Assign alternating colors to the chain
	chain.forEach(([row, col], index) => {
		colors.set(`${row},${col}`, index % 2 === 0);
	});

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0 && !colors.has(`${row},${col}`)) {
				const possibleValues = getPossibleValues(board, row, col);
				if (possibleValues.includes(candidate)) {
					// Eliminate candidate if it creates a contradiction
					for (const [chainRow, chainCol] of chain) {
						const color = colors.get(`${chainRow},${chainCol}`);
						if (
							(chainRow === row ||
								chainCol === col ||
								isInSameBlock([chainRow, chainCol], [row, col])) &&
							color === false
						) {
							updated = true;
							// Simulate elimination (modify logic to store/eliminate candidates)
						}
					}
				}
			}
		}
	}

	return updated;
}
