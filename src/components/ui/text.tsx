import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";
import { Text as RNText, type TextStyle } from "react-native";
import { cn } from "@/utils/cn";

const TextClassContext = React.createContext<string | undefined>(undefined);

const FONT_FAMILY_MAP: Record<string, string> = {
	"font-thin": "ClashDisplayExtraLight",
	"font-extralight": "ClashDisplayExtraLight",
	"font-light": "ClashDisplayLight",
	"font-normal": "ClashDisplayRegular",
	"font-medium": "ClashDisplayMedium",
	"font-semibold": "ClashDisplaySemiBold",
	"font-bold": "ClashDisplayBold",
	"font-extrabold": "ClashDisplayBold",
	"font-black": "ClashDisplayBold",
};

const extractFontFamily = (
	className: string | undefined,
): string | undefined => {
	if (!className) return FONT_FAMILY_MAP["font-normal"];

	const fontClass = className.split(" ").find((cls) => cls.startsWith("font-"));
	return fontClass
		? FONT_FAMILY_MAP[fontClass]
		: FONT_FAMILY_MAP["font-normal"];
};

const Text = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, style, ...props }, ref) => {
		const textClass = React.useContext(TextClassContext);
		const fontFamily = extractFontFamily(className);

		const Component = asChild ? Slot.Text : RNText;
		return (
			<Component
				style={[{ fontFamily }, style] as unknown as TextStyle}
				className={cn("text- text-foreground", textClass, className)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Text.displayName = "Text";

export { Text, TextClassContext };
