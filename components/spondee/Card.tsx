import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import {useState} from "react";


type CardProps = { text: string };

export default function Card({text}: CardProps){
    // const [text,setText] = useState(text);

    // const handlePress = (message)=>{
    //     setText(message);
    // 

    return (
        //add onPress
        <TouchableOpacity style={styles.item} >
            <Text style={styles.name}>{text}</Text>
        </TouchableOpacity>
    );
}


let grayColor = "#e6e6e6";

const styles = StyleSheet.create({
    content: {
        height: "20%",
        // width: "40%",
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "10%",
        // minWidth:"40%",
        backgroundColor: "powderblue",
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    item: {
        backgroundColor: grayColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 18,
        width: 180,
        aspectRatio: 1.1,
        borderRadius: 10,
        // width: "auto",
      },
      name: {
        fontSize: 32,
      },
  });