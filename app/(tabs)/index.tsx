import { Text, View, StyleSheet, Alert } from "react-native";
import AuthScreen from '../authScreen'
import {AuthButton} from '../authScreen'
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'
export default function Index() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

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
          <Text>Welcome, User!</Text>
          <Text>Your User ID: {session.user.id}</Text>
          <AuthButton label = "Log In" onPress = {handleLogout}/>
        </View>
      ) : (
        <AuthScreen />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1, justifyContent: 'center', alignItems: 'center' 
  }
});
