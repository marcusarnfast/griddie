import { useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import * as Linking from "expo-linking";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export const MagicLinkForm = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const redirectURL = Linking.createURL("/profile/magic-link");

	const SignInWithMagicLink = async () => {
		setIsLoading(true);

		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: redirectURL,
			},
		});
		console.log(data);
		console.log(error);

		setIsLoading(false);
	};

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	return (
		<View className="flex gap-4">
			<Label nativeID="email">Email</Label>
			<Input
				id="email"
				placeholder="Email"
				value={email}
				autoCapitalize="none"
				autoComplete="email"
				autoCorrect={false}
				onChangeText={setEmail}
				keyboardType="email-address"
			/>
			<Button onPress={SignInWithMagicLink}>
				<Text>Magic Link</Text>
			</Button>
		</View>
	);
};
