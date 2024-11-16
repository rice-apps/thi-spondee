import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable, Image } from "react-native";
import { supabase } from '../..//lib/supabase';
import React from "react";
export default function profilePicker(){
    const [searchQuery, setSearchQuery] = React.useState<string>(''); 
    const [children, setChildren] = React.useState<Child[] | null>(null);
    const [filteredChildren, setFilteredChildren] = React.useState<Child[]| null>([]); 
    const [selectedProfile, setSelectedProfile] = React.useState("");


    React.useEffect(() => {
        const fetchChildren = async () => {
            const { data, error } = await supabase
                .from('children')
                .select('id, first_name, last_name, username');
            if (error) {
                console.error(error);
            } else if (data) {
                setChildren(data);
                setFilteredChildren(data); // Initialize filtered list with full data
            }
        };

        fetchChildren();
    }, []);


    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredChildren(children); 
        } else {
            const lowerCaseQuery = query.toLowerCase().replace(/\s+/g, ' ');
            if(children == null){
                return;
            }
            const filtered = children.filter((child) => {
                const fullName = `${child.first_name} ${child.last_name}`.toLowerCase();
                const username = `${child.username.toLowerCase().replace(/\s+/g, ' ')}`
                return fullName.startsWith(lowerCaseQuery) || username.startsWith(lowerCaseQuery);
            });
        setFilteredChildren(filtered);
        }
    };

    const chooseProfile = async (id: string) =>{
        setSelectedProfile(id);
    }

    const handleButtonClick = () => {
        if (selectedProfile) {
            console.log(`Selected UUID: ${selectedProfile}`);
        } else {
            console.log("No profile selected.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.header}>Select Child Profile</Text>
                    <TextEntry 
                        label="Search name or username" 
                        value={searchQuery} 
                        onChangeText={handleSearch}
                    />
                </View>
            </View>
            <ScrollView 
                style={styles.profileContainer}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.profileGrid}>
                    {filteredChildren ?
                        filteredChildren.map((child) => (
                            <ProfileCard
                                key={child.id} 
                                id={child.id} 
                                first_name={child.first_name}
                                last_name={child.last_name}
                                username={child.username}
                                isSelected={selectedProfile === child.id} 
                                chooseProfile={chooseProfile} 
                            />
                        ))
                        :
                        <Text>Children not found</Text>
                    }
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <SelectButton handleButtonClick={handleButtonClick}></SelectButton>
            </View>
        </View>
    );
}

type Child = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
};

type AuthTextEntryProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
};

type ProfileCardProps = {
    first_name: string;
    last_name: string;
    username: string;
    id: string;
    isSelected: boolean;
    chooseProfile: (id: string) => void;
}

type SelectButtonProps = {
    handleButtonClick: () => void;
};

export function TextEntry({ label, value, onChangeText}: AuthTextEntryProps) {
    return (
        <View>
            <TextInput 
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
            />
        </View>
    );
}

function SelectButton({handleButtonClick}: SelectButtonProps){
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress = {handleButtonClick}>
                <Text style={styles.buttonLabel}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

export function ProfileCard({ first_name, last_name, username, id, isSelected, chooseProfile }: ProfileCardProps) {
    const firstNameWithLastInitial = `${first_name} ${last_name.charAt(0)}.`;
  return (
    <View style={styles.cardWrapper}>
      <Pressable 
        onPress={() => chooseProfile(id)}
        style={({ pressed }) => [
          styles.card,
          isSelected && styles.selectedCard,
          pressed && styles.pressedCard
        ]}
      >
        <View style={styles.imageContainer}> 
          <Image style={styles.image} />
        </View>
      </Pressable>
      <Text style={[
        styles.title,
        isSelected && styles.selectedTitle
      ]}>{username}</Text>
      <Text style={[
        isSelected && styles.selectedTitle
      ]}>
        {firstNameWithLastInitial}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 30,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 60,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',  
        alignItems: 'flex-end',        
        width: 1000,
        paddingBottom: 10,    
    },
    header:{
      fontWeight: 'bold'  ,
      fontSize: 25
    },
    subheader:{
      fontWeight: 'bold',  
      fontSize: 15
    },
    input: {
        borderColor: '#95D0E7',
        borderWidth:2,
        padding: 8,
        paddingLeft: 20,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        width: 400,
        height: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    scrollContent: {
        flexGrow: 1,
    },
    profileGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignContent: 'flex-start', // This helps with vertical spacing
        width: '100%',
        minHeight: '100%',
    },
    profileContainer:{
        width: 1000,
        flex: 1,  // Changed from fixed height to flex
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',  
        alignItems: 'flex-end',        
        width: 1000,
        paddingBottom: 10,             
    },
    button: {
        backgroundColor: '#0000004D',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
        width: 150
    },
    buttonLabel: {
        color: 'black',
    },
    cardWrapper: {
        width: 225,  // Adjusted width to fit more cards (1000px / 5 cards ≈ 200px - margins)
        alignItems: 'center',
        margin: 10,
      },
    card: {
        height: 120,
        width: 120,
        backgroundColor: "lightgrey",
        margin: 10,
        borderRadius: 70,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    titleContainer: {
        flex: 1.1,
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 5, // Space between card and text
        textAlign: 'center',
    },
    selectedCard: {
        borderColor: '#95D0E7', // iOS blue color, you can change this
        backgroundColor: '#95D0E7', // Light blue background
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      pressedCard: {
        opacity: 0.8,
      },
      selectedTitle: {
        color: '#007AFF',
        fontWeight: '600',
      },
});

