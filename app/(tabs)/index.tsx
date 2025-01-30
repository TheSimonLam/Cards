import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectUserValue } from "../../features/user/userSlice";
import { useGetUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function HomeScreen() {
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

const styles = StyleSheet.create({
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
