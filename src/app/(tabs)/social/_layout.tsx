import { Grid3X3Icon } from "@/components/icons/grid-3x3";
import { MedalIcon } from "@/components/icons/medal";
import { UserCog2Icon } from "@/components/icons/user-cog";
import { UsersRoundIcon } from "@/components/icons/users-round";
import { Stack, Tabs } from "expo-router";

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
					title: "Social",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="add-friend"
				options={{
					title: "Add Friend",
					headerShown: false,
					presentation: "fullScreenModal",
				}}
			/>
		</Stack>
	);
}
