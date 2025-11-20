// app/(auth)/forgot-password.tsx
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      {message ? <Text style={{ color: "green" }}>{message}</Text> : null}
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
}
