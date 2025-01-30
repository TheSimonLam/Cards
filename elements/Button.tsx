import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type ButtonVariant = "solid" | "disabled" | "outlined";

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant: ButtonVariant;
};

export const Button = ({ text, onPress, variant }: ButtonProps) => {
  const { styles } = useStyles(stylesheet, {
    variant,
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  buttonContainer: {
    height: 50,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    variants: {
      variant: {
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
      },
    },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
    variants: {
      variant: {
        solid: {},
        disabled: { color: Colors.darkGrey },
        outlined: { color: Colors.red },
      },
    },
  },
}));
