import { Colors } from "@/constants/Colors";
import { CardRarityMapper, cardSizeScaler } from "@/constants/Global";
import { Text } from "@/elements/Text";
import { Card as CardType } from "@/typing/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
          {Array.from({ length: card.rarity }).map((_num, index) => (
            <Image
              key={index}
              source={{
                uri: "https://www.freeiconspng.com/uploads/yellow-star-icon-21.png",
              }}
              height={cardSizeScaler * 20}
              width={cardSizeScaler * 20}
              resizeMode={"cover"}
            />
          ))}
        </View>
        <View style={styles.cardImageContainer}>
          <Image
            source={{
              uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c977eabb-4db6-4ef1-9f0c-1fe00e997eaa/dattmhl-56af50b4-f333-43ee-a7be-f5a2f07a1c9a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M5NzdlYWJiLTRkYjYtNGVmMS05ZjBjLTFmZTAwZTk5N2VhYVwvZGF0dG1obC01NmFmNTBiNC1mMzMzLTQzZWUtYTdiZS1mNWEyZjA3YTFjOWEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EPBhWKmOr5antj8qSU36PT2gl0p6BWZTRkRWU0j69fI",
            }}
            style={styles.cardImageContainer}
            resizeMode={"cover"}
          />
        </View>
      </View>
      <View
        style={[styles.detailsContainer, styles.detailsColumnContainerLeft]}
      >
        <View style={styles.detailsColumnContainer}>
          <Text fontSize={14} weight="bold">
            {card.description}
          </Text>
        </View>
        <View
          style={[
            styles.detailsColumnContainer,
            styles.detailsColumnContainerRight,
          ]}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statContainer}>
              <MaterialCommunityIcons size={24} name={"sword"} />
            </View>
            <View style={styles.statContainer}>
              <Text fontSize={20} weight="bold">{card.attack}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statContainer}>
              <MaterialCommunityIcons size={24} name={"shield-half-full"} />
            </View>
            <View style={styles.statContainer}>
              <Text fontSize={20} weight="bold">{card.defence}</Text>
            </View>
          </View>
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
    top: 0,
    left: 0,
  },
  nameContainer: {
    padding: 10 * cardSizeScaler,
    borderWidth: 1,
    borderRadius: 5 * cardSizeScaler,
    borderColor: Colors.card.base.indents,
    marginBottom: 5 * cardSizeScaler,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  rarityContainer: {
    flexDirection: "row",
    padding: 2 * cardSizeScaler,
    marginBottom: 5 * cardSizeScaler,
  },
  cardImageContainer: {
    borderWidth: 1,
    borderColor: Colors.card.base.indents,
    width: "100%",
    height: cardSizeScaler * 220,
    borderRadius: cardSizeScaler * 6,
  },
  detailsContainer: {
    paddingLeft: 10 * cardSizeScaler,
    paddingRight: 10 * cardSizeScaler,
    paddingBottom: 10 * cardSizeScaler,
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
  detailsColumnContainer: {
    flex: 1,
    padding: 10 * cardSizeScaler,
    borderWidth: 1,
    borderRadius: 5 * cardSizeScaler,
    borderColor: Colors.card.base.indents,
    marginBottom: 5 * cardSizeScaler,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    height: "100%",
  },
  detailsColumnContainerLeft: { marginRight: 10 * cardSizeScaler },
  detailsColumnContainerRight: { marginLeft: 10 * cardSizeScaler },
  statsContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  statContainer: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
