import { Colors } from "@/constants/Colors";
import { CardRarityMapper, cardSizeScaler } from "@/constants/Global";
import { Text } from "@/elements/Text";
import { Card as CardType } from "@/typing/interfaces";
import { Dimensions, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type StyleProps = {
  cardWidth: number;
  cardHeight: number;
};

type CombinedStyleProps = Partial<CardType> & StyleProps;

export const Card = ({ card }: { card: CardType }) => {
  const { styles } = useStyles(stylesheet);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = windowWidth * cardSizeScaler
  return (
    <View
      style={styles.cardContainer({
        cardWidth: windowWidth,
        cardHeight: windowHeight,
      })}
    >
      <Text>{card.name}</Text>
      <Text>{CardRarityMapper[card.rarity]}</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  cardContainer: (props: CombinedStyleProps) => ({
    backgroundColor: theme.colors.orange,
    width: props.cardWidth,
    height: props.cardHeight,
  }),
}));
