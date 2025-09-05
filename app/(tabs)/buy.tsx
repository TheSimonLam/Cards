import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/elements/Text";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPacks } from "@/features/global/globalThunks";
import { AppDispatch } from "@/features/store";
import { selectPacks } from "@/features/global/globalSlice";
import { selectUserDetails } from "@/features/user/userSlice";
import { Pack } from "@/components/Pack";

export default function BuyScreen() {
  const { styles } = useStyles(stylesheet);
  const dispatch = useDispatch<AppDispatch>();
  const packs = useSelector(selectPacks);
  const userDetails = useSelector(selectUserDetails) || {};

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
          <View style={styles.packsContainer}>
            {packs.map((pack, index) => (
              <Pack key={`${index}-${pack.pack_id}`} pack={pack} />
            ))}
          </View>
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
  packsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
}));
