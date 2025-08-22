import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import React, { useState } from "react";
import { TextInput, Button, Pressable, Alert, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/elements/Text";
import { supabase } from "@/services/supabase";

const Login = () => {
  const { styles } = useStyles(stylesheet);

  const [emailAddress, setEmailAddress] = useState("thesimonlam@gmail.com");
  const [password, setPassword] = useState("HelloWorld");

  const onSignInPress = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password: password,
    });
    if (error) Alert.alert(error.message);
  };

  return (
    <>
      <LinearGradient
        colors={[Colors.yellow, Colors.paleYellow, Colors.red]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.logoImgContainer}>
          <Image
            source={{
              uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e0ea4e74-8e44-4e0e-9c55-eb7b22916821/d6f4or1-45193032-1b07-4bdb-b533-065e334250f4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwZWE0ZTc0LThlNDQtNGUwZS05YzU1LWViN2IyMjkxNjgyMVwvZDZmNG9yMS00NTE5MzAzMi0xYjA3LTRiZGItYjUzMy0wNjVlMzM0MjUwZjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hLohtHQPmPQn43i9gwHYpVVGh7GJAXQdShQS7qCcOHs",
            }}
            style={styles.logoImg}
          />
        </View>

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
  logoImgContainer: { alignItems: "center", marginBottom: 100 },
  logoImg: {
    height: 100,
    width: 100,
    borderRadius: 60,
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
