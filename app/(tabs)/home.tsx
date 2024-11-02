import React, {useState} from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
             <View>
                    <Text style={ {color: "black", fontSize: 35, fontWeight: "500", textAlign: "left"} }>
                        Name's Dashboard
                    </Text>
            </View>
            <View style={{flex: 0.4, flexDirection: "row", justifyContent: "space-between", }}> 
                <View style={{alignItems: "flex-end"}}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => "" }>
                        <Text style={{color: "black", fontSize: 20, fontWeight: "normal", textAlign: "center"}}>
                            Switch Profile
                        </Text>
                    </TouchableOpacity>
                </View>
               
            </View>
            
            <View>
               
                <Text style={ {color: "black", fontSize: 25, fontWeight: "400", textAlign: "left", marginTop: 50} }>
                    Recent Sessions
                </Text>
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
});