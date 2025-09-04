import { Button } from "@/elements/Button";
import { Text } from "@/elements/Text";
import {
  selectDeckCards,
  setCardViewerOpenWithCards,
} from "@/features/global/globalSlice";
import { AppDispatch } from "@/features/store";
import { Card } from "@/typing/interfaces";
import { reorderCardsByIndex } from "@/utils/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface CardListItemProps {
  card: Card;
  index: number;
}

export const CardListItem = ({ card, index }: CardListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectDeckCards);
  const { styles } = useStyles(stylesheet);

  const onCardPress = (pressedCardIndex: number) => {
    const reorderedCards = reorderCardsByIndex(cards, pressedCardIndex);
    dispatch(setCardViewerOpenWithCards(reorderedCards));
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onCardPress(index);
      }}
    >
      <View style={[styles.detailContainer, styles.flexGrow1]}>
        <Text weight="bold" fontSize={14}>
          {card.name}
        </Text>
      </View>
      <View style={[styles.detailContainer, styles.flexGrow2]}>
        {Array.from({ length: card.rarity }).map((_num, index) => (
          <Image
            key={index}
            source={{
              uri: "https://www.freeiconspng.com/uploads/yellow-star-icon-21.png",
            }}
            height={20}
            width={20}
            resizeMode={"cover"}
          />
        ))}
      </View>
      <View style={[styles.detailContainer, styles.flexGrow1]}>
        <MaterialCommunityIcons size={20} name={"sword"} />
        <Text fontSize={14}>{card.attack}</Text>
      </View>
      <View style={[styles.detailContainer, styles.flexGrow1]}>
        <MaterialCommunityIcons size={20} name={"shield-half-full"} />
        <Text fontSize={14}>{card.defence}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderBottomWidth: 2,
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "center",
  },
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
  flexGrow1: { flexGrow: 1 },
  flexGrow2: { flexGrow: 2 },
  flexGrow3: { flexGrow: 3 },
}));
