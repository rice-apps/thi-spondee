import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';


export default function Card(){
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return (
            <View style={styles.box}>
                <View style={styles.innerBox}>
                    <View style={styles.textContainer}>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Text style={styles.textStyle}>
                            Spondee Cards
                        </Text>
                        <View style={styles.whiteBoxContainer}>
                            <View style = {styles.whiteBox}>
                                <Text style={{textAlign: "center", fontWeight: 400,
                                 padding: 4, fontSize:15, color: "white"}}>4 set</Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.progressContainer}>
                        <Progress.Circle
                              indeterminate={false}
                              animated={false}
                              progress={0.5}
                              showsText={true}
                              size={60}
                              textStyle={{ fontSize: 18, color: "black", fontWeight: 500}}
                              color={"#7B9CCF"}
                              unfilledColor={"#D9D9D9"}
                              borderWidth={0}
                              thickness={6}
                        />
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#F6F6F6",
        width: 275,
        height: 195,
        borderRadius:12,
        padding: 20,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 40,
    },innerBox: {
        width: 210,
        height: 152,

    },
    dateText: {
        color: "#6D6D6D",
        fontSize: 15,
    },
    textStyle: {
        color: "black",
        fontSize: 20,
        marginTop: 5,
        fontWeight: "400",
        marginBottom: -5,
    },
    whiteBox: {
        backgroundColor: "#6D88B4",
        width: 66,
        height: 28,
        borderRadius: 20,

    },
    whiteBoxContainer: {
        // position: "absolute",
        display: "flex",
        flexDirection: "row",
        marginTop: 17,
        gap: 15,
    },
    textContainer: {
    },
    progressContainer: {
        display: "flex",
        // justifyContent: "flex-end",
        alignContent: "center",
        flex: 1,
        flexDirection: "row-reverse",
    }
})