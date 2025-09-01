import { ScrollView, View } from "react-native";

import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/elements/Text";
import { Button } from "@/elements/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPacks } from "@/features/cards/cardsThunks";
import { AppDispatch } from "@/features/store";
import { selectPacks } from "@/features/cards/cardsSlice";
import { setCardViewerOpenWithCardIds } from "@/features/global/globalSlice";
import { selectUserDetails } from "@/features/user/userSlice";

export default function BuyScreen() {
  const { styles } = useStyles(stylesheet);
  const dispatch = useDispatch<AppDispatch>();
  const packs = useSelector(selectPacks);
  const userDetails = useSelector(selectUserDetails) || {};

  const onBuyPress = (packId: string) => {
    //TODO: Open an new pack and return cards in that new pack
    dispatch(setCardViewerOpenWithCardIds(["1", "2", "3"]));
  };

  useEffect(() => {
    dispatch(fetchPacks());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.titleContainer}>
            <Text fontSize={24} weight="bold">
              Buy
            </Text>
            <Text>£{userDetails.balance || 0}</Text>
          </View>
          {packs.map((pack: any) => (
            <Button
              key={pack.pack_id}
              variant="solid"
              text={pack.name}
              onPress={() => {
                onBuyPress(pack.pack_id);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingLeft: theme.margins.md,
    paddingRight: theme.margins.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
}));
