import React, {useState} from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import TopBar from "@/components/home/TopBar";
import Card from "@/components/home/Card";


export default function Home() {
    return (
        <View style={styles.container}>
            <TopBar/>
            <View>
                <Text style={ {color: "black", fontSize: 25, fontWeight: "400", textAlign: "left", marginTop: 50} }>
                    Recent Sessions
                </Text>
            </View>
            {/* rectangle that contains all the cards*/ }
            <View style={styles.cardsContainer}>
                <Card/>
                <Card/>
                <Card/>
            </View>
            <View style={styles.footer}>
                {/* need to add on click */}
                <AntDesign name="plus" size={24} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 40,
        marginTop: 50, 
    },
    buttonStyle:{
        width: 140, 
        height: 50,
        padding: 8,
        justifyContent: "center", 
        borderRadius: 12,
        backgroundColor: "#D9D9D9",  
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 40,
        flexWrap: "wrap"
    },
    footer: {
        position: "absolute",
        right: 50,
        bottom: 50,
        width: 50,
        aspectRatio: 1/1,
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    }
});