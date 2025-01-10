import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Profile",
				}}
			/>
			<Stack.Screen
				name="magic-link"
				options={{
					presentation: "modal",
					title: "Magic Link",
				}}
			/>
		</Stack>
	);
}
