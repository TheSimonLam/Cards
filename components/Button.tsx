import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type ButtonVariant = "solid" | "disabled" | "outlined";

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant: ButtonVariant;
};

export const Button = ({ text, onPress, variant }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[buttonStyles.baseButtonStyles, buttonStyles[variant]]}
  >
    <Text style={[buttonTextStyles.baseTextStyles, buttonTextStyles[variant]]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const buttonStyles = StyleSheet.create({
  baseButtonStyles: {
    height: 50,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  solid: {
    backgroundColor: Colors.red,
  },
  disabled: {
    borderWidth: 3,
    borderColor: Colors.darkGrey,
    backgroundColor: Colors.lightGrey,
  },
  outlined: {
    borderWidth: 3,
    borderColor: Colors.red,
    backgroundColor: Colors.white,
  },
});

const buttonTextStyles = StyleSheet.create({
  baseTextStyles: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
  },
  solid: {},
  disabled: { color: Colors.darkGrey },
  outlined: { color: Colors.red },
});
