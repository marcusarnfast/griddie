import { FONT_FAMILY, NAV_THEME } from "@/constants/nav-theme";
import { useColorScheme } from "@/utils/use-color-scheme";
import {
	type Theme,
	DefaultTheme,
	ThemeProvider as NativeThemeProvider,
} from "@react-navigation/native";

const LIGHT_THEME: Theme = {
	...DefaultTheme,
	dark: false,
	colors: NAV_THEME.light,
	fonts: FONT_FAMILY,
};
const DARK_THEME: Theme = {
	...DefaultTheme,
	dark: true,
	colors: NAV_THEME.dark,
	fonts: FONT_FAMILY,
};

type ThemeProviderProps = Partial<
	React.ComponentProps<typeof NativeThemeProvider>
>;

export function ThemeProvider({
	children,
	value,
	...props
}: ThemeProviderProps) {
	const { isDarkColorScheme } = useColorScheme();
	const theme = value ?? (isDarkColorScheme ? DARK_THEME : LIGHT_THEME);

	return (
		<NativeThemeProvider {...props} value={theme}>
			{children}
		</NativeThemeProvider>
	);
}
