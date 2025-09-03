import { Colors } from "@/constants/Colors";
import { CardRarityMapper, cardSizeScaler } from "@/constants/Global";
import { Text } from "@/elements/Text";
import { Card as CardType } from "@/typing/interfaces";
import { Dimensions, Image, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type StyleProps = {
  cardWidth: number;
  cardHeight: number;
};

type CombinedStyleProps = CardType & StyleProps;

export const Card = ({ card }: { card: CardType }) => {
  const { styles } = useStyles(stylesheet);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = windowWidth * cardSizeScaler;
  return (
    <View
      style={styles.cardContainer({
        cardWidth: windowWidth,
        cardHeight: windowHeight,
        ...card,
      })}
    >
      {card.rarity === 7 && (
        <Image
          style={styles.holographic}
          source={require("../assets/images/cards/holographic.jpg")}
        ></Image>
      )}
      <Text>{card.name}</Text>
      <Text>{CardRarityMapper[card.rarity]}</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  cardContainer: (props: CombinedStyleProps) => ({
    borderWidth: 5 * cardSizeScaler,
    borderRadius: 5 * cardSizeScaler,
    borderColor:
      Colors.card.border[props.rarity as keyof typeof Colors.card.border],
    backgroundColor:
      props.rarity === 7
        ? Colors.card.body[props.rarity]
        : Colors.card.body[props.rarity as keyof typeof Colors.card.body],
    width: props.cardWidth,
    height: props.cardHeight,
    position: "relative",
  }),
  holographic: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.7,
  },
}));
