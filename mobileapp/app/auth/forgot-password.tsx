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
      <View>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Button title="Send Reset Email" onPress={handleReset} />
        {message ? <Text>{message}</Text> : null}
        {error ? <Text>{error}</Text> : null}
      </View>
    );
  }
