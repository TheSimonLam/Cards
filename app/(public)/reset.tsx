import { View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/services/supabase";

const PwReset = () => {
  const { styles } = useStyles(stylesheet);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(emailAddress);
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      alert("Password reset successfully");
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

        {!successfulCreation && (
          <>
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={styles.inputField}
            />

            <Button
              onPress={onRequestReset}
              title="Send Reset Email"
              color={Colors.red}
            ></Button>
          </>
        )}

        {successfulCreation && (
          <>
            <View>
              <TextInput
                value={code}
                placeholder="Code..."
                style={styles.inputField}
                onChangeText={setCode}
              />
              <TextInput
                placeholder="New password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
              />
            </View>
            <Button
              onPress={onReset}
              title="Set new Password"
              color={Colors.red}
            ></Button>
          </>
        )}
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

export default PwReset;
