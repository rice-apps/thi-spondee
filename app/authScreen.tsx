import { View, Text, StyleSheet, Alert, Pressable, TextInput } from "react-native";
import { supabase } from '../lib/supabase'
import React from 'react'

type TextEntryProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

type ButtonLabelProps = {
    label: string;
    onPress: () => void;
}

export default function AuthScreen(){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleButtonPress(){
        if (!email || !password) {
            Alert.alert("Validation Error", "Both email and password fields must be filled.");
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            Alert.alert(error.message);
            return;
        }
    
        const userUUID = data?.user?.id;
        if (userUUID) {
            console.log("User UUID:", userUUID);
        } else {
            Alert.alert("Error", "User ID not found.");
        }
    }

    return (
        <View style={styles.centerBox}> 
            <View style={styles.loginContainer}>
                <Text style={styles.welcomeText}>Welcome Back!</Text> 
                <Text style={styles.loginText} >Log in to access your patient profiles</Text>
                <AuthTextEntry label = "Email" value = {email} onChangeText = {setEmail} /> 
                <AuthTextEntry label = "Password" value = {password} onChangeText = {setPassword}/>
                <AuthButton label = "Log In" onPress = {handleButtonPress}/>
            </View>
        </View>
    );

}


export function AuthTextEntry({ label, value, onChangeText}: TextEntryProps){
    return (
        <View>
            <Text style = {styles.buttonLabel}>{label}</Text>
            <TextInput 
                value = {value} 
                onChangeText = {onChangeText}
            />
        </View>
    );
}

export function AuthButton({ label, onPress }: ButtonLabelProps){
    return (
        <View>
            <Pressable style={styles.loginButton} onPress = {onPress}>
                <Text>{label}</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({

    centerBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
       
    },
    loginContainer : {
        justifyContent: "flex-start",
    },
    welcomeText: {
        fontSize: 28,
    },
    loginText: {
        fontSize: 20,
    },
    buttonLabel: {
        fontSize: 20, 
    }, 
    loginButton:{   
        borderColor: '#1c1c1e',
        backgroundColor: '#1c1c1e',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 50, 
    },
});