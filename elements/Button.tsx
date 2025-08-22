import { Colors } from "@/constants/Colors";
import { Text, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const enum ButtonVariantTypes {
  SOLID = "solid",
  DISABLED = "disabled",
  OUTLINED = "outlined",
}

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
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      disabled={variant === ButtonVariantTypes.DISABLED}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  buttonContainer: {
    height: 44,
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
    fontSize: 16,
    fontWeight: "500",
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
