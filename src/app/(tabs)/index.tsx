import React, { useState } from "react";
import { View, Button } from "react-native";
import { Text } from "@/components/ui/text";
import { generateBoard } from "@/utils/sudoku/generate-board";
import { classifyDifficulty } from "@/utils/sudoku/classify-difficulty";

export default function TabOneScreen() {
	const [puzzle, setPuzzle] = useState<number[][] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	// Function to handle puzzle generation
	const handleGeneratePuzzle = async () => {
		setLoading(true); // Start loading
		const board = await generateBoard(50);
		setPuzzle(board);
		setLoading(false);
	};

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-2xl font-extrabold text-red-500 mb-4">
				Generate Game
			</Text>
			<View className="h-1 w-1/2 bg-gray-500 my-4" />
			<Button title="Generate Sudoku Puzzle" onPress={handleGeneratePuzzle} />

			<View>
				{loading && <Text>Loading...</Text>}
				{puzzle && (
					<View className="border border-black">
						{puzzle.map((row, rowIndex) => (
							<View key={Number(rowIndex)} className="flex-row">
								{row.map((cell, cellIndex) => (
									<View
										key={Number(cellIndex)}
										className="w-10 h-10 border border-gray-400 items-center justify-center "
									>
										<Text className="text-lg font-bold">{cell || ""}</Text>
									</View>
								))}
							</View>
						))}
					</View>
				)}
			</View>
		</View>
	);
}
