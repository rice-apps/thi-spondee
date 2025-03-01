import { router } from "expo-router";
import { StyleSheet, View, Alert } from "react-native";
import { THIText } from "../THIText";
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from "@/lib/supabase";
import { userData } from "@/app/currentProfile";

const TopBar = ({ emoji, username }: { emoji: string; username: string }) => {
  const data = [
    { label: 'Switch Profile', value: 'switch' },
    { label: 'Delete Profile', value: 'delete' },
  ];

  const handleOptionSelect = async (item: { value: string }) => {
    switch (item.value) {
      case 'switch':
        router.push("/profilePicker");
        break;
      case 'delete':
        confirmDeleteProfile();
        break;
    }
  };

  const confirmDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete this profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteProfile() },
      ]
    );
  };

  const deleteProfile = async () => {
    try {
      const currentUserId = userData.CURRENT_ID;
  
      if (!currentUserId) {
        Alert.alert("Error", "No user ID found. Unable to delete profile.");
        return;
      }
  
    
      const { data: sessions, error: fetchSessionsError } = await supabase
        .from("test_session")
        .select("id")
        .eq("child_id", currentUserId);
  
      if (fetchSessionsError) {
        throw fetchSessionsError;
      }
  
      const sessionIds = sessions.map(session => session.id);
  
      if (sessionIds.length > 0) {
        
        const { error: deleteTrialsError } = await supabase
          .from("test_trial")
          .delete()
          .in("test_session_id", sessionIds); 
  
        if (deleteTrialsError) {
          throw deleteTrialsError;
        }
  
        
        const { error: deleteSessionsError } = await supabase
          .from("test_session")
          .delete()
          .eq("child_id", currentUserId);
  
        if (deleteSessionsError) {
          throw deleteSessionsError;
        }
      }
  
      const { error: deleteProfileError } = await supabase
        .from("children")
        .delete()
        .eq("id", currentUserId);
  
      if (deleteProfileError) {
        throw deleteProfileError;
      }
  
      console.log(`Profile with ID ${currentUserId}, related test sessions, and test trials deleted successfully.`);
  
      
      router.replace("/profilePicker");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }; 
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <THIText style={styles.emoji}>{emoji}</THIText>
        </View>
      </View>
      <View style={styles.name}>
        <THIText style={{ color: "black", fontSize: 28, fontWeight: "600", textAlign: "left" }}>
          {username}
        </THIText>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          onChange={handleOptionSelect}
          style={styles.dropdown}
          containerStyle={styles.dropdownList}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          itemTextStyle={styles.dropdownItemText}
          activeColor="#F6F6F6"
          renderRightIcon={() => <THIText style={styles.threeDots}>...   </THIText>}
          placeholder=""
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 100,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
  },
  name: {
    flex: 5,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 60,
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dropdown: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: '10%', 
    width: 180,
    alignSelf: "flex-end", 
    position: "absolute", 
    left: '84%',
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    zIndex: 999, 
  },
  dropdownPlaceholder: {
    fontSize: 0,
  },
  dropdownSelectedText: {
    fontSize: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  threeDots: {
    fontSize: 28,
    color: "#000000",
    fontWeight: '600',
  },
});

export default TopBar;