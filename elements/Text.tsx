import { Text as RNText } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TextProps = {
  children: React.ReactNode;
  alignment?: "left" | "center" | "right";
  weight?: "regular" | "medium" | "semiBold" | "bold";
  fontSize?: number;
  numberOfLines?: number;
  selectable?: boolean;
  testId?: string;
};

export const Text = ({
  children,
  alignment,
  fontSize,
  numberOfLines,
  selectable,
  weight,
  testId,
}: TextProps) => {
  const { styles } = useStyles(stylesheet);

  if (!children) {
    return null;
  }
  return (
    <RNText
      testID={testId}
      style={styles.text({ alignment, fontSize, weight })}
      numberOfLines={numberOfLines}
      textBreakStrategy="simple"
      selectable={selectable}
    >
      {children}
    </RNText>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  text: (props: Partial<TextProps>) => ({
    textAlignment: props.alignment ? props.alignment : "left",
    fontFamily: props.weight ? props.weight : "regular",
    fontSize: props.fontSize,
    color: theme.colors.text,
  }),
}));
