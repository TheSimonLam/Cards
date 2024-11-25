/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Primary colors
const darkBlue = "#003049";
const red = "#d62828";
const orange = "#f77f00";
const yellow = "#fcbf49";
const paleYellow = "#eae2b7";

// Dark/Light mode colors
const tintColorLight = "#fff";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#fff",
    tabIconSelected: tintColorLight,
    headerBackgroundColor: red,
    footerBackgroundColor: red,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#fff",
    tabIconSelected: tintColorDark,
    headerBackgroundColor: red,
    footerBackgroundColor: red,
  },
};
