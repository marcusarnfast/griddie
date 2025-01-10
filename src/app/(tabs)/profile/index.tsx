import { SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { MagicLinkForm } from "@/components/form/magic-link";
import { DismissKeyboard } from "@/components/ui/dismiss-keyboard";

export default function ProfileScreen() {
	const router = useRouter();
	return (
		<DismissKeyboard>
			<SafeAreaView className="flex-1">
				<View className="py-4 flex gap-4">
					<Header />
				</View>
				<View className="px-4">
					<Text>Sign in with magic link</Text>
					<MagicLinkForm />
				</View>
			</SafeAreaView>
		</DismissKeyboard>
	);
}

const Header = () => {
	return (
		<View className="px-4">
			<Text className="text-3xl font-semibold">Profile</Text>
		</View>
	);
};
