import { ScrollView, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { increment, selectUserValue } from "../../features/user/userSlice";
import { useGetUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);

  const { requestGetUser } = useGetUser();
  const { user } = useUser() || { user: {} };
  // const dispatch = useDispatch();

  // const counter = useSelector(selectUserValue);

  // const handleButtonPress = () => {
  //   dispatch(increment());
  // };

  useEffect(() => {
    (async () => {
      try {
        const res = await requestGetUser(user?.username);
        // Save this personal user info in redux state
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={styles.titleContainer}>
          <Text>What's New</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
