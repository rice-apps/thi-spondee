import React, {useState} from "react";
import { Text, View, Button, Modal, StyleSheet, Image, TouchableOpacity, Dimensions} from "react-native";
import Slider from '@react-native-community/slider';

export default function Settings() {
    const [modalVisible, setModalVisible] = useState(false);
    const [setSize, setSetSize] = useState(4);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={require("../../assets/images/settings.png")} style={styles.imageStyle}/>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                
                {/*----SETTINGS MODAL----*/}
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={{color: "black", fontSize: 27, fontWeight: "normal", textAlign: "left"}}>
                            Settings
                        </Text>
                        {/*----SET SIZE----*/}
                        <View>
                            <Text style={styles.textStyle}>
                                Set Size
                            </Text>
                            <Slider
                                style={{width: 200, height: 40}}
                                minimumValue={4}
                                maximumValue={12}
                                minimumTrackTintColor="black"
                                maximumTrackTintColor="black"
                                thumbTintColor="white"
                                step={4}
                                value={setSize}
                                onValueChange={(newValue) => setSetSize(newValue)}
                                />
                                <View style={{flexDirection: "row", justifyContent: "space-between", width: 200}}>
                                    <Text>   4</Text>
                                    <Text>8</Text>
                                    <Text>12  </Text>
                                </View>
                        </View>
                        <View style={{flex: 0.4, flexDirection: "row", justifyContent: "space-between", }}> 
                            <View>
                                <Text style={styles.textStyle}>
                                    Volume
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.textStyle}>
                                    Sound
                                </Text>
                            </View>
                        </View>
                        <View style={{alignItems: "flex-end"}}> 
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setModalVisible(false)}>
                                <Text style={{color: "black", fontSize: 15, fontWeight: "normal", textAlign: "center"}}>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "flex-end",
        padding: 40,
    },
    modalOverlay:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",  
    },
    modalBox:{
        width: 500,
        height: 300, 
        backgroundColor: "white",  
        shadowColor: "black", 
        shadowRadius: 4, 
        shadowOpacity: 0.8, 
        elevation: 5,
        borderRadius: 10,
        padding: 20,
        justifyContent: "space-between",
    },
    imageStyle:{
        width: 25, 
        height: 25,
        marginTop: 20,
    },
    textStyle:{
        marginTop: 15,
        color: "black",
        fontSize: 20,
        fontWeight: "300",
        textAlign: "left",
    }, 
    buttonStyle:{
        width: 80, 
        height: 40,
        padding: 8,
        justifyContent: "center", 
        borderRadius: 10,
        backgroundColor: "#D9D9D9",  
    },
});