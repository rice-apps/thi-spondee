import AuthScreen, { AuthButton } from "@/components/authentication/authScreen";
import { THIText } from "@/components/THIText";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import "react-native-url-polyfill/auto";
export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // If they're logged in, push the testing selection route
      if (session && session.user) {
        router.push("/profilePicker");
      }
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout Error", error.message);
    } else {
      console.log("User logged out successfully");
    }
  };

  return (
    <View style={styles.containerStyle}>
      {session && session.user ? (
        <View>
          <THIText>
            Welcome, {session.user.user_metadata.first_name}{" "}
            {session.user.user_metadata.last_name}!
          </THIText>
          <THIText>Your User ID: {session.user.id}</THIText>
          <AuthButton label="Sign Out" onPress={handleLogout} />
        </View>
      ) : (
        <AuthScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
