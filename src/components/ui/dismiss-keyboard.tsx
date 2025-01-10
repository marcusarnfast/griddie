import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard = ({
	children,
}: { children: React.ReactNode }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
