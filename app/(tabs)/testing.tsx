import { StyleSheet, Pressable, Text, View } from "react-native";

export default function TestSelection() {
    const tests = {
        speechTherapy: {
            esp: [
                { title: "Syllable Differentiation" },
                { title: "Spondee Cards" },
                { title: "Minimal Pairs" }
            ],
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.testingSelectionStyles}>
                    Speech Therapy
                </Text>
                <View>
                    <Text style={styles.ESPTestStyles}>ESP Test</Text>
                    <View style={styles.buttonGroup}>
                        {tests?.speechTherapy?.esp.map(
                            test =>
                                <Pressable style={styles.button} onPress={() => { }}>
                                    <Text style={styles.buttonText}>{test.title}</Text>
                                </Pressable>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        backgroundColor: "aliceblue"
    },
    testingSelectionStyles: {
        fontFamily: 'inter',
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 20,
        marginTop: 15,
    },
    ESPTestStyles: {
        fontFamily: 'inter',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 35,
    },
    button: {
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: 'grey',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonGroup: {
      flexDirection: "row",
      backgroundColor: "red",
      alignContent: "center",
    }
}
);
