import { Alert, Button, TextInput } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/services/supabase";

const Register = () => {
  const { styles } = useStyles(stylesheet);
  const { theme } = useStyles();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: emailAddress,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setPendingVerification(true);
    if (!session) router.replace("/login");
    setLoading(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <Spinner visible={loading} />

        {!pendingVerification && (
          <>
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={styles.inputField}
            />
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
            />

            <Button
              onPress={onSignUpPress}
              title="Sign up"
              color={theme.colors.red}
            ></Button>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.red,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
}));

export default Register;
