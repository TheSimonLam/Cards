import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

export type DeckProps = {
  title: string;
};

export const DeckButton = ({ title }: DeckProps) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableHighlight style={styles.container}>
      <>
        <Image
          source={{
            uri:
              title === "Unorganized"
                ? "https://cdn-icons-png.flaticon.com/512/6688/6688557.png"
                : title === "New Deck"
                ? "https://cdn-icons-png.flaticon.com/512/2661/2661440.png"
                : "https://i.ebayimg.com/00/s/MTU5OVgxMTMw/z/ROoAAOSw~7Nf7ibu/$_57.JPG?set_id=8800005007",
          }}
          style={styles.deckImg}
        />
        <ThemedText type="default">{title}</ThemedText>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
    alignItems: "center",
  },
  deckImg: {
    height: 130,
    width: 96,
  },
});
