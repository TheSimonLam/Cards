/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Primary colors
const darkOrange = "#fb8500";
const lightOrange = "#ffb703";
const lightestBlue = "#8ecae6";
const lighterBlue = "#219ebc";
const darkBlue = "#023047";

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
    headerBackgroundColor: lightOrange,
    footerBackgroundColor: lightOrange,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#fff",
    tabIconSelected: tintColorDark,
    headerBackgroundColor: lightOrange,
    footerBackgroundColor: lightOrange,
  },
};
