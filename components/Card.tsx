import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import {useState} from "react";

export default function Card(){
    const [text,setText] = useState("Hello 1");

    const handlePress = ()=>{
        setText("Hello");
    }

    return (
        <TouchableOpacity style={styles.content} onPress={handlePress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    content: {
        height: "20%",
        width: "20%",
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "10%",
        minWidth:"20%",
        backgroundColor: "powderblue",
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        
    },
  });