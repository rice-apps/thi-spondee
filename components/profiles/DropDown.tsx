import { TouchableOpacity, View, StyleSheet, Image} from "react-native";
import { THIText } from "@/components/THIText";



const DropDown = ({ name, values }: { name: string; values: Array<string> }) => {
    return (
        <View style = {styles.container}>
            <View>
                <TouchableOpacity style={styles.buttonStyle}>
                    <THIText style = {styles.textstyle}>
                        {name} 
                    </THIText>
                    <Image
                        source={require("../../assets/images/keyboard_arrow_down.png")}
                        style={{ width: 10.68, height: 6.02, justifyContent: "center", alignItems: "center" }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                {values.map((value) => {
                    return (
                        <TouchableOpacity>

                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 118,
        height: 200,
        borderColor: "red",
        borderRadius: 10
    },
    buttonStyle: {
        width: 118,
        height: 32,
        paddingHorizontal: 15,
        justifyContent: "space-between",
        borderRadius: 10,
        borderColor: "gray",
        alignItems: "center",
        borderWidth: 1,
        flexDirection: "row",
        gap: 10
    },
    textstyle: {
        fontSize: 15
    },
    box: {
        height: "auto",
    }
    

});   

export default DropDown;