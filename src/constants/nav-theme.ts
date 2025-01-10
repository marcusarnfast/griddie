import type { Theme } from "@react-navigation/native";

export const FONT_FAMILY: Theme["fonts"] = {
	regular: {
		fontFamily: "ClashDisplayRegular",
		fontWeight: "400",
	},
	medium: {
		fontFamily: "ClashDisplayMedium",
		fontWeight: "500",
	},
	bold: {
		fontFamily: "ClashDisplaySemiBold",
		fontWeight: "600",
	},
	heavy: {
		fontFamily: "ClashDisplayBold",
		fontWeight: "700",
	},
};

export const NAV_THEME: {
	light: Theme["colors"];
	dark: Theme["colors"];
} = {
	light: {
		background: "hsl(0 0% 100%)", // background
		border: "hsl(240 5.9% 90%)", // border
		card: "hsl(0 0% 100%)", // card
		notification: "hsl(0 84.2% 60.2%)", // destructive
		primary: "hsl(240 5.9% 10%)", // primary
		text: "hsl(240 10% 3.9%)", // foreground
	},
	dark: {
		background: "hsl(240 10% 3.9%)", // background
		border: "hsl(240 3.7% 15.9%)", // border
		card: "hsl(240 10% 3.9%)", // card
		notification: "hsl(0 72% 51%)", // destructive
		primary: "hsl(0 0% 98%)", // primary
		text: "hsl(0 0% 98%)", // foreground
	},
};
