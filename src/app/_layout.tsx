import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Providers from "./providers";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		ClashDisplay: require("@/assets/fonts/clash-display/ClashDisplay-Variable.ttf"),
		ClashDisplayExtraLight: require("@/assets/fonts/clash-display/ClashDisplay-Extralight.otf"),
		ClashDisplayLight: require("@/assets/fonts/clash-display/ClashDisplay-Light.otf"),
		ClashDisplayMedium: require("@/assets/fonts/clash-display/ClashDisplay-Medium.otf"),
		ClashDisplayRegular: require("@/assets/fonts/clash-display/ClashDisplay-Regular.otf"),
		ClashDisplaySemiBold: require("@/assets/fonts/clash-display/ClashDisplay-Semibold.otf"),
		ClashDisplayBold: require("@/assets/fonts/clash-display/ClashDisplay-Bold.otf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<>
			<Providers>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</Providers>
		</>
	);
}
