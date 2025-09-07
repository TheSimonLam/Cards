import { CARD_ART_IMAGES } from "@/constants/CardArtImages";
import { Colors } from "@/constants/Colors";
import { screenSizeScaler } from "@/constants/Global";
import { Text } from "@/elements/Text";
import { Card as CardType } from "@/typing/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, Image, ImageBackground, View } from "react-native";
import { Shimmer } from "react-native-fast-shimmer";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type StyleProps = {
  cardWidth: number;
  cardHeight: number;
};

type CombinedStyleProps = CardType & StyleProps;

export const Card = ({ card }: { card: CardType }) => {
  const { styles } = useStyles(stylesheet);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = windowWidth * screenSizeScaler;
  return (
    <>
      {card.rarity === 7 && (
        <Shimmer
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99,
            width: windowWidth,
            height: windowHeight,
          }}
          linearGradients={[
            "transparent",
            "#fafafa",
            "transparent",
          ]}
        />
      )}
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
                height={screenSizeScaler * 20}
                width={screenSizeScaler * 20}
                resizeMode={"cover"}
              />
            ))}
          </View>
          <View style={styles.cardImageContainer}>
            <Image
              source={
                CARD_ART_IMAGES[
                  card.card_metadata_id as keyof typeof CARD_ART_IMAGES
                ]
              }
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
                <Text fontSize={20} weight="bold">
                  {card.attack}
                </Text>
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statContainer}>
                <MaterialCommunityIcons size={24} name={"shield-half-full"} />
              </View>
              <View style={styles.statContainer}>
                <Text fontSize={20} weight="bold">
                  {card.defence}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  cardContainer: (props: CombinedStyleProps) => ({
    borderWidth: 5 * screenSizeScaler,
    borderRadius: 5 * screenSizeScaler,
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
  cardWrapper: { padding: 10 * screenSizeScaler },
  holographic: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
  },
  nameContainer: {
    padding: 10 * screenSizeScaler,
    borderWidth: 1,
    borderRadius: 5 * screenSizeScaler,
    borderColor: Colors.card.base.indents,
    marginBottom: 5 * screenSizeScaler,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  rarityContainer: {
    flexDirection: "row",
    padding: 2 * screenSizeScaler,
    marginBottom: 5 * screenSizeScaler,
  },
  cardImageContainer: {
    borderWidth: 1,
    borderColor: Colors.card.base.indents,
    width: "100%",
    height: screenSizeScaler * 220,
    borderRadius: screenSizeScaler * 6,
  },
  detailsContainer: {
    paddingLeft: 10 * screenSizeScaler,
    paddingRight: 10 * screenSizeScaler,
    paddingBottom: 10 * screenSizeScaler,
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
  detailsColumnContainer: {
    flex: 1,
    padding: 10 * screenSizeScaler,
    borderWidth: 1,
    borderRadius: 5 * screenSizeScaler,
    borderColor: Colors.card.base.indents,
    marginBottom: 5 * screenSizeScaler,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    height: "100%",
  },
  detailsColumnContainerLeft: { marginRight: 10 * screenSizeScaler },
  detailsColumnContainerRight: { marginLeft: 10 * screenSizeScaler },
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
