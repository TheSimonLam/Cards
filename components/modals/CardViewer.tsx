import { Text } from "@/elements/Text";
import { selectCardViewerOpenWithCards } from "@/features/global/globalSlice";
import { useSelector } from "react-redux";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Card } from "../Card";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const CardViewer = () => {
  const cards = useSelector(selectCardViewerOpenWithCards);
  const progress = useSharedValue<number>(0);
  const windowWidth = Dimensions.get("window").width;
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Carousel
        data={cards}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={windowWidth}
        style={{
          width: windowWidth,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item: card, index }) => (
          <Card key={`${index}-${card.card_metadata_id}`} card={card} />
        )}
      />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {},
}));
