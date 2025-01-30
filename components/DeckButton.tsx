import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export type DeckProps = {
  title: string;
};

export const DeckButton = ({ title }: DeckProps) => {
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
        <Text>{title}</Text>
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
