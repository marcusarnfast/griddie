import { Grid3X3Icon } from "@/components/icons/grid-3x3";
import { MedalIcon } from "@/components/icons/medal";
import { UserCog2Icon } from "@/components/icons/user-cog";
import { UsersRoundIcon } from "@/components/icons/users-round";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
			}}
		>
			<Tabs.Screen
				name="scoreboard"
				options={{
					title: "Scoreboard",
					headerShown: false,
					tabBarIcon: ({ focused, color, size }) => (
						<MedalIcon color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="social"
				options={{
					title: "Social",
					headerShown: false,
					tabBarIcon: ({ focused, color, size }) => (
						<UsersRoundIcon color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					title: "Play",
					tabBarIcon: ({ focused, color, size }) => (
						<Grid3X3Icon color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused, color, size }) => (
						<UserCog2Icon color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
