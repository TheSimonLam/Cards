import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";

export const DeckButton = () => {
  const colorScheme = useColorScheme();

  return (
    <TouchableHighlight style={styles.container}>
      <Image
        source={{
          uri: "https://i.ebayimg.com/00/s/MTU5OVgxMTMw/z/ROoAAOSw~7Nf7ibu/$_57.JPG?set_id=8800005007",
        }}
        style={styles.deckImg}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
  },
  deckImg: {
    height: 130,
    width: 96,
  },
});
