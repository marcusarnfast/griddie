import { Link, Stack } from "expo-router";

import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 items-center justify-center font-sans">
				<Text className="text-2xl font-bold text-red-500">
					This screen doesn't exist.
				</Text>

				<Link href="/" className="mt-15">
					<Text className="text-red-500">Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}
