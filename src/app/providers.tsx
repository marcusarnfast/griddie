import { ThemeProvider } from "@/components/providers/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider>{children}</ThemeProvider>
		</>
	);
}
