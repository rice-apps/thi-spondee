import { View, Text, StyleSheet, Alert, Pressable, TextInput } from "react-native";
import { supabase } from '../lib/supabase'
import React from 'react'

export default function AuthScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState(''); 
    const [lastName, setLastName] = React.useState('');   
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isSigningUp, setIsSigningUp] = React.useState(false);

    const handleLoginPress = async () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Both email and password fields must be filled.");
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
            Alert.alert("Validation Error", "Both email and password fields must be filled.");
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
            <Text style = {styles.header}>Welcome back!</Text>
            <Text style = {styles.subheader}>Log in to access your patient profiles</Text>
            <AuthTextEntry label="Email" value={email} onChangeText={setEmail} />
            <AuthTextEntry label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <AuthButton label="Log In" onPress={handleLoginPress} />
            <Pressable onPress={() => setIsSigningUp(true)}>
                <Text>Don't have an account? <Text style={styles.switchButton}>Sign Up</Text> </Text>
            </Pressable>
        </View>
    );

    const renderSignupPage = () => (
        <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>
            <Text style = {styles.subheader}>Sign up to access your patient profiles</Text>
            <AuthTextEntry label="First Name" value={firstName} onChangeText={setFirstName} />
            <AuthTextEntry label="Last Name" value={lastName} onChangeText={setLastName} />
            <AuthTextEntry label="Email" value={email} onChangeText={setEmail} />
            <AuthTextEntry label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <AuthButton label="Sign Up" onPress={handleSignupPress} />
            <Pressable onPress={() => setIsSigningUp(false)}>
                <Text>Already have an account? <Text style={styles.switchButton}> Log In</Text></Text>
            </Pressable>
        </View>
    );

    const renderHomePage = () => (
        <View style={styles.container}>
            <Text>Welcome to the Home Page!</Text>
            <Pressable onPress={handleLogout}>
                <Text>Log Out</Text>
            </Pressable>
        </View>
    );

    // Conditional rendering based on the authentication state
    return isLoggedIn ? renderHomePage() : isSigningUp ? renderSignupPage() : renderLoginPage();
}

// Reusable TextEntry and Button components
type AuthTextEntryProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
};

export function AuthTextEntry({ label, value, onChangeText, secureTextEntry = false }: AuthTextEntryProps) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
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
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    );
}

// Styles for your components
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header:{
      fontWeight: 'bold'  ,
      fontSize: 25
    },
    subheader:{
      fontWeight: 'bold',  
      fontSize: 15
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginVertical: 5,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },
    switchButton:{
        color: "#0000FF",
    },
});