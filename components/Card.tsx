import { Colors } from "@/constants/Colors";
import { CardRarityMapper, cardSizeScaler } from "@/constants/Global";
import { Text } from "@/elements/Text";
import { Card as CardType } from "@/typing/interfaces";
import { Dimensions, Image, ImageBackground, View } from "react-native";
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
        <ImageBackground
          style={styles.holographic}
          source={require("../assets/images/cards/holographic.jpg")}
          resizeMode="cover"
        ></ImageBackground>
      )}
      <View style={styles.cardWrapper}>
        <View style={styles.nameContainer}>
          <Text fontSize={16} weight="bold">
            {card.name}
          </Text>
        </View>
        <View style={styles.rarityContainer}>
          {Array.from({ length: card.rarity }).map(() => (
            <Image
              source={{
                uri: "https://www.freeiconspng.com/uploads/yellow-star-icon-21.png",
              }}
              height={cardSizeScaler * 20}
              width={cardSizeScaler * 20}
              resizeMode={"cover"}
            />
          ))}
        </View>
      </View>
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
  cardWrapper: { padding: 10 * cardSizeScaler },
  holographic: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.7,
    top: 0,
    left: 0,
  },
  nameContainer: {
    padding: 10 * cardSizeScaler,
    borderWidth: 2 * cardSizeScaler,
    borderRadius: 5 * cardSizeScaler,
    borderColor: Colors.card.base.indents,
    marginBottom: 5 * cardSizeScaler,
  },
  rarityContainer: {
    flexDirection: "row",
    padding: 2 * cardSizeScaler,
  },
}));
