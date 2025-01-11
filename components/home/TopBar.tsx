import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import {router} from "expo-router"
export default function TopBar(){
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.image}></View>
            </View>
            <View style={styles.name}>
                    <Text style={ {color: "black", fontSize: 35, fontWeight: "500", textAlign: "left"} }>
                        Name's Dashboard
                    </Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}> 
                <View style={{alignItems: "flex-end"}}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => router.push("/profilePicker") }>
                        <Text style={{color: "black", fontSize: 20, fontWeight: "normal", textAlign: "center"}}>
                            Switch Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        width: 140, 
        height: 50,
        padding: 8,
        justifyContent: "center", 
        borderRadius: 12,
        backgroundColor: "#D9D9D9",  
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    image: {
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        width: 100,
        aspectRatio: 1/1,
    },
    imageContainer: {
        flex: 1,
    },
    name: {
        flex: 5,
        justifyContent: "center",
    },
});
