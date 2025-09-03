import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const enum IconButtonVariantTypes {
  SOLID = "solid",
  DISABLED = "disabled",
  OUTLINED = "outlined",
}

export type IconButtonVariant = "solid" | "disabled" | "outlined" | "ghost";

type IconButtonProps = {
  onPress: () => void;
  variant: IconButtonVariant;
  iconName: keyof typeof MaterialIcons.glyphMap;
  color?: string;
  size?: number;
};

type StyleProps = {};

type CombinedStyleProps = Partial<IconButtonProps> & StyleProps;

export const IconButton = ({
  onPress,
  variant,
  iconName,
  size = 32,
}: IconButtonProps) => {
  const { styles } = useStyles(stylesheet, {
    variant,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.iconButtonContainer({})}
      disabled={variant === IconButtonVariantTypes.DISABLED}
    >
      <MaterialIcons size={size} name={iconName} />
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  iconButtonContainer: (props: CombinedStyleProps) => ({
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    variants: {
      variant: {
        solid: {
          backgroundColor: theme.colors.red,
        },
        disabled: {
          borderWidth: 3,
          borderColor: theme.colors.darkGrey,
          backgroundColor: theme.colors.lightGrey,
        },
        outlined: {
          borderWidth: 3,
          borderColor: theme.colors.red,
          backgroundColor: theme.colors.white,
        },
        ghost: {},
      },
    },
  }),
}));
