import { screenSizeScaler } from "@/constants/Global";
import { PACK_ART_IMAGES } from "@/constants/PackArtImages";
import { AppDispatch } from "@/features/store";
import { selectUserDetails } from "@/features/user/userSlice";
import { fetchBuyPack } from "@/features/user/userThunks";
import { AuthContext } from "@/providers/AuthProvider";
import { Pack as PackType } from "@/typing/interfaces";
import { useContext } from "react";
import { Alert, Dimensions, Image, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

type StyleProps = {
  windowWidth: number;
};

type CombinedStyleProps = Partial<PackType> & StyleProps;

interface PackProps {
  pack: PackType;
}

export const Pack = ({ pack }: PackProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const authSession = useContext(AuthContext);
  const userDetails = useSelector(selectUserDetails) || {};
  const { styles } = useStyles(stylesheet);
  const windowWidth = Dimensions.get("window").width;

  const onBuyPress = (packId: string) => {
    if (userDetails.balance - pack.cost >= 0) {
      dispatch(fetchBuyPack({ packId, userId: authSession?.user.id }));
    } else {
      Alert.alert("Not enough balance");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onBuyPress(pack.pack_id)}
      style={styles.container({ windowWidth })}
    >
      <Image
        source={PACK_ART_IMAGES[pack.name as keyof typeof PACK_ART_IMAGES]}
        style={styles.packImageContainer}
        resizeMode={"cover"}
      />
    </TouchableOpacity>
    // />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: (props: CombinedStyleProps) => ({
    paddingLeft: theme.margins.md,
    paddingRight: theme.margins.md,
    width: props.windowWidth / 2.2,
    marginBottom: theme.margins.md,
  }),
  packImageContainer: { width: "100%", height: screenSizeScaler * 210 },
}));
