import React, {useState} from "react";
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import { Table, Row, Rows } from "react-native-table-component";

export default function SessionResults() {
    const tableData = {
        tableHead: ['Word', 'Response', 'Result'],
        tableData: [
        ["Outside", "Outside", true],
        ["Outside", "Outside", false],
        ["Outside", "Outside", true],
        ["Outside", "Outside", true],
        ["Outside", "Outside", false],
        ["Outside", "Outside", true],
        ["Outside", "Outside", false],
        ["Outside", "Outside", false],
        ["Outside", "Outside", true]
    ],
    };
    const [data, setData] = useState(tableData);

    return (
        <View style={styles.container}>
            {/*----SESSION RESULTS HEADER----*/}
            <View style={{flex: 0.25, justifyContent: "center"}}>
                <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{color: "black", fontSize: 27, fontWeight: "normal", textAlign: "left"}}>
                        Session Results 
                    </Text>
                    <TouchableOpacity>
                            <Image source={require('../../assets/images/share_icon.png')} style={{ width: 26, height: 26, marginTop: 10, marginLeft: 25}} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, width: "28%", flexDirection: "row", justifyContent: "space-between"}}> 
                    <Text style={styles.grayTextStyle}>
                        Spondee Cards 
                    </Text>
                    <Image source={require('../../assets/images/gray_dot.png')} style={{ width: 10, height: 10, marginTop: 23, marginHorizontal: 10}} />
                    <Text style={styles.grayTextStyle}>
                        November 1, 2024 
                    </Text>
                </View>
            </View>

            {/*----MAIN CONTENT----*/}
            <View style={{flex: 1, flexDirection: "row"}}>
                {/*----COLUMN 1: METRICS----*/}
                <View style={{width: "40%"}}>
                    <View style={{width: "80%", borderWidth: 1, borderColor: "#7B9CCF", justifyContent: "center", padding: 30, marginBottom: 30}}>
                        <Text style={{color: "black", fontSize: 22, fontWeight: "normal", textAlign: "left"}}>
                            Setting Details  
                        </Text>
                        <View style={{flexDirection: "row", width: "70%",  justifyContent: "space-between"}}> 
                            <Text style={styles.blackTextStyle}>Set Size: 4 </Text><Text style={styles.blackTextStyle}>Sound: On</Text>
                        </View>
                    </View>
                    <View style={{width: "80%", borderWidth: 1, borderColor: "#7B9CCF", justifyContent: "center", padding: 30}}>
                        <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{color: "black", fontSize: 22, fontWeight: "normal", textAlign: "left"}}>
                                Additional Notes  
                            </Text>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/edit_icon.png')} style={{ width: 22, height: 22, marginTop: 3, marginLeft: 118}} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.blackTextStyle}>
                                Threshold Level: XX dB
                        </Text>
                        <Text style={{color: "#17262B", marginTop: 25, fontSize: 16, fontWeight: "400",}}>
                            Any additional notes that the therapist wants to document will be displayed in this section
                        </Text>
                    </View>
                </View>

                {/*----COLUMN 2: WORDS----*/}
                <View style={{width: "50%"}}>
                    <View style={{width: "65%", borderWidth: 1, borderColor: "#7B9CCF", justifyContent: "center", padding: 30}}>
                        <Text style={{color: "black", fontSize: 22, fontWeight: "normal", textAlign: "left",  marginBottom: 25}}>
                            Overall Score  
                        </Text>
                        <View style={{flexDirection: "row", width: "auto",  justifyContent: "space-between"}}> 
                            <CircularProgress
                                value={80}
                                radius={45}
                                duration={2000}
                                valueSuffix={'%'}
                                progressValueColor={'#000000'}
                                activeStrokeColor={'#7B9CCF'}
                                inActiveStrokeColor={'#7B9CCF'}
                                inActiveStrokeOpacity={0.2}
                                maxValue={100}
                                progressValueStyle={{fontWeight: 'normal'}}
                            />
                            <View style={{}}>
                                <Text style={{ color: "black", fontSize: 19, fontWeight: "normal",}}>
                                    16 Correct
                                </Text>
                                <Text style={styles.blackTextStyle}>
                                    4 Incorrect 
                                </Text>
                            </View>
                        </View>
                    </View>
            
                    <View style={styles.tableContainer}>
                        <View>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#7B9CCF' }}>
                                <Row 
                                    data={tableData.tableHead} 
                                    style={styles.head} 
                                    textStyle={styles.headText} 
                                />
                            </Table>
                        </View>
                        <ScrollView>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#7B9CCF' }}>   
                                {data.tableData.map((col, colIndex) => (
                                    <Row
                                        key={colIndex}
                                        data={[
                                            col[0], 
                                            col[1], 
                                            col[2] ? (
                                                <Image
                                                    source={require('../../assets/images/correct_mark.png')}
                                                    style={styles.tableImage}
                                                />
                                            ) : (
                                                <Image
                                                    source={require('../../assets/images/incorrect_mark.png')}
                                                    style={styles.tableImage}
                                                />
                                            ),
                                        ]}
                                        style={styles.data}
                                        textStyle={styles.dataText}
                                    />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 60,
        backgroundColor: "#ffffff",
    },
    tableContainer: { flex: 1, marginTop: 25, backgroundColor: '#fff' },
    head: { height: 44, backgroundColor: '#7B9CCF'},
    data: { height: 44},
    headText: {paddingHorizontal: 22, fontSize: 22, fontStyle: "normal", color: "white"},
    dataText: { fontSize: 16, paddingHorizontal: 22},
    imageStyle:{
        width: 25, 
        height: 25,
        marginTop: 20,
    },
    tableImage:{
        alignSelf: 'center',
        width: 25,
        height: 25,
    },
    blackTextStyle:{
        marginTop: 25,
        color: "black",
        fontSize: 19,
        fontWeight: "normal",
    }, 
    grayTextStyle:{
        marginTop: 15,
        color: "gray",
        fontSize: 19,
        fontWeight: "normal",
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