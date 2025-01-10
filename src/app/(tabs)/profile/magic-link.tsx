import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";

export default function MagicLinkScreen() {
	return (
		<SafeAreaView className="flex-1">
			<View className="py-4 flex gap-4">
				<Header />
				<Text>Magic Link page</Text>
			</View>
		</SafeAreaView>
	);
}

const Header = () => {
	return (
		<View className="px-4">
			<Text className="text-3xl font-semibold">Profile</Text>
		</View>
	);
};
