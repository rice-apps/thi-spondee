import React, {useState} from "react";
import {Text, TouchableOpacity, Modal, View, StyleSheet, TextInput, Image } from "react-native";
export default function AddProfile() {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    return (
        <View>
            <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.image}></View>
            </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {/*----ADD PROFILE MODAL----*/}
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.headingStyle}>
                            Add Profile
                        </Text>
                        <View style={{ flexDirection: "row", display: "flex", gap: 80}}>
                            <View style={styles.imageContainer}> 
                                <View style={styles.image}>
                                    <View style={styles.imageContainer}>
                                        <Image source={require("../../assets/images/blackadd.png")} style={{width: 40, height: 40}}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.textStyle}>
                                    Name
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setText}
                                    value={text}
                                ></TextInput>
                                <Text style={styles.textStyle}>
                                    Username
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setText2}
                                    value={text2}
                                ></TextInput>
                            </View>
                        </View>
                        {/*----Save Button----*/}
                        <View style={{alignItems: "flex-end"}}> 
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setModalVisible(false)}>
                                <Text style={{color: "#17262B", fontSize: 17, fontWeight: "500", textAlign: "center", fontFamily: "Inter"}}>
                                    Save
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
    modalOverlay:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",  
    },
    modalBox: {
        width: 652,
        height: 490, 
        backgroundColor: "white",  
        shadowColor: "black", 
        shadowRadius: 4, 
        shadowOpacity: 0.8, 
        elevation: 5,
        borderRadius: 10,
        padding: 40,
        justifyContent: "space-between",
    },
    image: {
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        width: 140,
        height: 140,
        aspectRatio: 1/1, 
    }, 
    imageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    headingStyle: {
        fontSize: 28,
        color: "black", 
        fontStyle: "normal",
        fontFamily: "Inter",
        fontWeight: "600"
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 500, 
        fontFamily: "Inter",
        fontStyle: "normal",
        marginTop: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        height: 50,
        width: 200,
    },
    buttonStyle:{
        width: 87, 
        height: 42,
        padding: 8,
        justifyContent: "center", 
        borderRadius: 15,
        backgroundColor: "#95D0E7",  
    },
    imageStyle: {

    }
});