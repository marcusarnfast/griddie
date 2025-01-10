import { hasUniqueSolution } from "./solve-board";
import type { SudokuBoard } from "./types";

type BoardString = string; // 81-character string representing the board
type BoardArray = string[][]; // 9x9 array of strings

/**
 * Generates a Sudoku board with a single solution, based on criteria.
 * @param minClues Minimum number of clues to retain on the board
 */
export async function generateBoard(minClues = 17): Promise<SudokuBoard> {
	// Step 1: Generate a valid, fully-filled board
	let board = createEmptyBoard();
	board = await fillBoard(board);

	// Step 2: Remove numbers while ensuring a single solution
	board = removeNumbers(board, minClues);

	// Convert to 2D array and return
	return stringTo2DArray(board).map((row) =>
		row.map((num) => (num === "_" ? 0 : +num)),
	);
}

/**
 * Creates an empty Sudoku board string.
 */
function createEmptyBoard(): BoardString {
	return "_".repeat(81);
}

/**
 * Fills the board with a valid Sudoku solution using a backtracking algorithm.
 */
async function fillBoard(board: BoardString): Promise<BoardString> {
	const emptyIndex = board.indexOf("_");
	if (emptyIndex === -1) return board; // Fully filled

	const numbers = shuffleArray("123456789".split(""));
	for (const num of numbers) {
		if (isSafe(board, emptyIndex, num)) {
			const newBoard = await fillBoard(replaceCharAt(board, emptyIndex, num));
			if (newBoard) return newBoard;
		}
	}

	return null; // Backtrack
}

/**
 * Removes numbers from a fully-filled board while maintaining a single solution.
 */
function removeNumbers(board: BoardString, minClues: number): BoardString {
	const cells = shuffleArray([...Array(81).keys()]); // Randomize cell indices

	for (const index of cells) {
		const backup = board[index];
		board = replaceCharAt(board, index, "_");

		if (
			countClues(board) < minClues ||
			!hasUniqueSolution(stringTo2DArray(board))
		) {
			board = replaceCharAt(board, index, backup); // Revert removal
		}

		if (countClues(board) <= minClues) break;
	}

	return board;
}

/**
 * Counts the number of non-empty cells (clues) on the board.
 */
function countClues(board: BoardString): number {
	return board.split("").filter((char) => char !== "_").length;
}

/**
 * Checks if a number can be safely placed at a given index.
 */
function isSafe(board: BoardString, index: number, num: string): boolean {
	const row = Math.floor(index / 9);
	const col = index % 9;
	const blockStart = Math.floor(row / 3) * 27 + Math.floor(col / 3) * 3;

	for (let i = 0; i < 9; i++) {
		if (
			board[row * 9 + i] === num || // Row check
			board[col + i * 9] === num || // Column check
			board[blockStart + Math.floor(i / 3) * 9 + (i % 3)] === num // Block check
		) {
			return false;
		}
	}
	return true;
}

/**
 * Replaces a character at a specific index in a string.
 */
function replaceCharAt(str: string, index: number, char: string): string {
	return str.substring(0, index) + char + str.substring(index + 1);
}

/**
 * Randomly shuffles an array.
 */
function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

/**
 * Converts the string representation of the board into a 2D array.
 */
function stringTo2DArray(board: BoardString): BoardArray {
	return board.match(/.{1,9}/g)?.map((row) => row.split("")) ?? [];
}
