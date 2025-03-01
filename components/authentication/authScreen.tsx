import React from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { THIText } from "../THIText";

export default function AuthScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@texashearing\.org$/;
    return emailRegex.test(email);
  };

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert(
        "Validation Error",
        "Both email and password fields must be filled."
      );
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Validation error", "Email must be a THI email.")
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    setIsLoggedIn(true); // User is now logged in
  };

  const handleSignupPress = async () => {
    if (!email || !password) {
      Alert.alert(
        "Validation Error",
        "Both email and password fields must be filled."
      );
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Validation error", "Email must be a THI email.")
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    Alert.alert("Success", "Sign up successful! Please log in.");
    setIsSigningUp(false); // Switch back to login after sign up
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout Error", error.message);
    } else {
      console.log("User logged out successfully");
      setIsLoggedIn(false); // User is now logged out
    }
  };

  const renderLoginPage = () => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/thi-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.header}>
        <THIText style={styles.headerText}>Welcome back!</THIText>
        <THIText>Log in to start a test session</THIText>
      </View>
      <AuthTextEntry label="Email" value={email} onChangeText={setEmail} />
      <AuthTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View>
        <Pressable style={styles.switch} onPress={() => setIsSigningUp(true)}>
          <THIText style={styles.switchButton}>Create Account</THIText>
        </Pressable>
      </View>
      <AuthButton label="Log In" onPress={handleLoginPress} />
    </View>
  );

  const renderSignupPage = () => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/thi-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.header}>
        <THIText style={styles.headerText}>Create Account</THIText>
      </View>
      <AuthTextEntry
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <AuthTextEntry
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <AuthTextEntry label="Email" value={email} onChangeText={setEmail} />
      <AuthTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.switch} onPress={() => setIsSigningUp(false)}>
        <THIText style={styles.switchButton}> Log In</THIText>
      </Pressable>
      <AuthButton label="Sign Up" onPress={handleSignupPress} />
    </View>
  );

  const renderHomePage = () => (
    <View style={styles.container}>
      <THIText>Welcome to the Home Page!</THIText>
      <Pressable onPress={handleLogout}>
        <THIText>Log Out</THIText>
      </Pressable>
    </View>
  );

  // Conditional rendering based on the authentication state
  return isLoggedIn
    ? renderHomePage()
    : isSigningUp
    ? renderSignupPage()
    : renderLoginPage();
}

// Reusable TextEntry and Button components
type AuthTextEntryProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export function AuthTextEntry({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: AuthTextEntryProps) {
  return (
    <View>
      <THIText style={styles.label}>{label}</THIText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

type AuthButtonProps = {
  label: string;
  onPress: () => void;
};

export function AuthButton({ label, onPress }: AuthButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <THIText style={styles.buttonLabel}>{label}</THIText>
    </Pressable>
  );
}

// Styles for your components
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoContainer: { width: 354, height: 96, marginBottom: 30 },
  header: {
    display: "flex",
    gap: 15,
    marginBottom: 25,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 600,
  },
  input: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderCurve: "circular",
    fontSize: 20,
    fontFamily: "Inter",
    height: 50,
    padding: 8,
    marginVertical: 10,
    borderRadius: 10,
  },
  label: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#95D0E7",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 25,
  },
  buttonLabel: {
    color: "#17262B",
  },
  switchButton: {
    textDecorationLine: "underline",
  },
  switch: {
    marginLeft: "auto",
  },
});
