import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type DeckProps = {
  title: string;
};

export const DeckButton = ({ title }: DeckProps) => {
  const { styles } = useStyles(stylesheet);

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

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginLeft: theme.margins.sm,
    marginRight: theme.margins.sm,
    alignItems: "center",
  },
  deckImg: {
    height: 130,
    width: 96,
  },
}));
