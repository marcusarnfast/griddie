import { SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons/plus";
import { useRouter } from "expo-router";

export default function SocialScreen() {
	return (
		<SafeAreaView className="flex-1">
			<View className="py-4 flex gap-4a">
				<Header />
			</View>
		</SafeAreaView>
	);
}

const Header = () => {
	const router = useRouter();

	return (
		<View className="px-4 flex flex-row justify-between items-start">
			<Text className="text-3xl font-semibold">Social</Text>
			<Button
				className="rounded-full size-10"
				size="icon"
				onPress={() => router.back()}
			>
				<PlusIcon className="size-4 text-primary-foreground" />
			</Button>
		</View>
	);
};
