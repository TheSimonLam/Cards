import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import React, { useState } from "react";
import { TextInput, Button, Pressable, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/elements/Text";
import { supabase } from "@/services/supabase";

const Login = () => {
  const { styles } = useStyles(stylesheet);

  const [emailAddress, setEmailAddress] = useState("thesimonlam@gmail.com");
  const [password, setPassword] = useState("HelloWorld");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <>
      <LinearGradient
        colors={[Colors.red, Colors.paleYellow, Colors.yellow]}
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} />

        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />

        <Button
          onPress={onSignInPress}
          title="Login"
          color={Colors.red}
        ></Button>

        <Link href="/reset" asChild>
          <Pressable style={styles.button}>
            <Text>Forgot password?</Text>
          </Pressable>
        </Link>
        <Link href="/register" asChild>
          <Pressable style={styles.button}>
            <Text>Create Account</Text>
          </Pressable>
        </Link>
      </SafeAreaView>
    </>
  );
};

const stylesheet = createStyleSheet({
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
    borderColor: Colors.red,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default Login;
