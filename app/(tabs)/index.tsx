import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import "react-native-url-polyfill/auto";
import { supabase } from "../../lib/supabase";
import AuthScreen, {
  AuthButton,
} from "../../components/authentication/authScreen";
export default function Index() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
          <Text>
            Welcome, {session.user.user_metadata.first_name}{" "}
            {session.user.user_metadata.last_name}!
          </Text>
          <Text>Your User ID: {session.user.id}</Text>
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
