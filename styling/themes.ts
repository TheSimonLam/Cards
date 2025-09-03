import { Colors } from "@/constants/Colors";

const base = {
  margins: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
    superLarge: 64,
    tvLike: 128,
  },
  fontSizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  spacing: {
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
  },
} as const;

export const lightTheme = {
  colors: {
    typography: Colors.neutrals[5],
    background: Colors.neutrals[0],
    text: Colors.neutrals[5],
    darkBlue: Colors.darkBlue,
    red: Colors.red,
    orange: Colors.orange,
    yellow: Colors.yellow,
    paleYellow: Colors.paleYellow,
    white: Colors.neutrals[0],
    lightGrey: Colors.neutrals[3],
    darkGrey: Colors.neutrals[4],
  },
  ...base,
} as const;

export const darkTheme = {
  colors: {
    typography: Colors.neutrals[0],
    background: Colors.neutrals[5],
    text: Colors.neutrals[5],
    darkBlue: Colors.darkBlue,
    red: Colors.red,
    orange: Colors.orange,
    yellow: Colors.yellow,
    paleYellow: Colors.paleYellow,
    white: Colors.neutrals[0],
    lightGrey: Colors.neutrals[3],
    darkGrey: Colors.neutrals[4],
  },
  ...base,
} as const;

// define other themes

export const defaultTheme = {
  colors: {
    typography: Colors.neutrals[0],
    background: Colors.neutrals[0],
    text: Colors.neutrals[5],
    darkBlue: Colors.darkBlue,
    red: Colors.red,
    orange: Colors.orange,
    yellow: Colors.yellow,
    paleYellow: Colors.paleYellow,
    white: Colors.neutrals[0],
    lightGrey: Colors.neutrals[3],
    darkGrey: Colors.neutrals[4],
  },
  ...base,
} as const;
