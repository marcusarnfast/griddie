import { useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { format, intervalToDuration } from "date-fns";
import { scores, type ScoresProps } from "@/lib/data/scores";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function ScoreboardScreen() {
	const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
		null,
	);

	const filteredScores = selectedDifficulty
		? scores.filter((score) => score.difficulty === selectedDifficulty)
		: scores;

	return (
		<SafeAreaView className="flex-1">
			<View className="py-4 flex gap-4">
				<Header />
				<DifficultyTabs
					selectedDifficulty={selectedDifficulty}
					onSelectDifficulty={setSelectedDifficulty}
				/>
			</View>

			<ScoreList scores={filteredScores} />
		</SafeAreaView>
	);
}

const Header = () => {
	return (
		<View className="px-4">
			<Text className="text-3xl font-semibold">Scoreboard</Text>
		</View>
	);
};

const DifficultyTabs = ({
	selectedDifficulty,
	onSelectDifficulty,
}: {
	selectedDifficulty: string | null;
	onSelectDifficulty: (difficulty: string | null) => void;
}) => {
	const difficulties = [
		"All",
		"Easy",
		"Medium",
		"Difficult",
		"Hard",
		"Evil",
		"Diabolical",
	];

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View className="flex-row gap-2 px-4">
				{difficulties.map((difficulty) => (
					<Tab
						key={difficulty}
						difficulty={difficulty}
						isSelected={
							(selectedDifficulty === null && difficulty === "All") ||
							selectedDifficulty === difficulty
						}
						onPress={() =>
							onSelectDifficulty(difficulty === "All" ? null : difficulty)
						}
					/>
				))}
			</View>
		</ScrollView>
	);
};

const Tab = ({
	difficulty,
	isSelected,
	onPress,
}: {
	difficulty: string;
	isSelected: boolean;
	onPress: () => void;
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className={`${
				isSelected
					? "bg-primary text-primary-foreground"
					: "bg-accent text-accent-foreground border border-input"
			} rounded-full px-4 py-2 flex-row items-center justify-center`}
		>
			<Text
				className={`${
					isSelected ? "text-primary-foreground" : "text-accent-foreground"
				} text-sm font-semibold`}
			>
				{difficulty}
			</Text>
		</TouchableOpacity>
	);
};

const ScoreItem = ({
	rank,
	startedAt,
	endedAt,
	player,
}: ScoresProps & { rank: number }) => {
	const startedAtDate = new Date(startedAt);
	const endedAtDate = new Date(endedAt);

	const formatStartDate = format(startedAtDate, "PPP");
	const duration = intervalToDuration({
		start: startedAtDate,
		end: endedAtDate,
	});

	return (
		<View className="flex-row items-center justify-between p-4 border-b border-border bg-background">
			<View className="flex-row items-center">
				<View className="w-10 h-10 rounded-full bg-accent items-center justify-center mr-4">
					<Text className="text-accent-foreground font-bold text-lg">
						{rank}
					</Text>
				</View>
				<View>
					<Text className="text-foreground font-semibold text-base">
						{player}
					</Text>
					<Text className="text-muted-foreground text-xs">
						{formatStartDate}
					</Text>
				</View>
			</View>
			<View className="items-end">
				<Text className="text-foreground font-medium text-sm mb-1">
					{duration.hours && `${duration.hours}h `}
					{duration.minutes && `${duration.minutes}m `}
					{duration.seconds && `${duration.seconds}s`}
				</Text>
			</View>
		</View>
	);
};

const ScoreList = ({ scores }: { scores: ScoresProps[] }) => {
	return (
		<Animated.FlatList
			data={scores}
			renderItem={({ item, index }) => (
				<ScoreItem key={item.id} {...item} rank={index + 1} />
			)}
			keyExtractor={(item) => item.id}
			itemLayoutAnimation={LinearTransition}
		/>
	);
};
