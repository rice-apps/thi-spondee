import { THIText } from "@/components/THIText";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import {setCurrentID } from "./currentProfile";
export default function profilePicker() {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [children, setChildren] = React.useState<Child[] | null>(null);
  const [filteredChildren, setFilteredChildren] = React.useState<
    Child[] | null
  >([]);
  const [selectedProfile, setSelectedProfile] = React.useState("");

  React.useEffect(() => {
    const fetchChildren = async () => {
      const { data, error } = await supabase
        .from("children")
        .select("id, first_name, last_name, username, emoji");
      if (error) {
        console.error(error);
      } else if (data) {
        setChildren(data);
        setFilteredChildren(data);
      }
    };

    fetchChildren();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredChildren(children);
    } else {
      const lowerCaseQuery = query.toLowerCase().replace(/\s+/g, " ");
      if (children == null) {
        return;
      }
      const filtered = children.filter((child) => {
        const fullName = `${child.first_name} ${child.last_name}`.toLowerCase();
        const username = `${child.username.toLowerCase().replace(/\s+/g, " ")}`;
        return (
          fullName.startsWith(lowerCaseQuery) ||
          username.startsWith(lowerCaseQuery)
        );
      });
      setFilteredChildren(filtered);
    }
  };

  const chooseProfile = async (id: string) => {
    setSelectedProfile(id);
    {/* Currently calls network everytime a profile is click - can be bettered in future*/}
    setCurrentID(id);
  };

  const handleButtonClick = () => {
  
    if (selectedProfile) {
      console.log(`Selected UUID: ${selectedProfile}`);
      router.push("/(tabs)/home");
    } else {
      console.log("No profile selected.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <THIText style={styles.header}>Select Child Profile</THIText>
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
          {filteredChildren ? (
            filteredChildren.map((child) => (
              <ProfileCard
                key={child.id}
                id={child.id}
                first_name={child.first_name}
                last_name={child.last_name}
                username={child.username}
                emoji={child.emoji}
                isSelected={selectedProfile === child.id}
                chooseProfile={chooseProfile}
              />
            ))
          ) : (
            <THIText>Children not found</THIText>
          )}
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
  emoji: string;
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
  emoji: string;
  isSelected: boolean;
  chooseProfile: (id: string) => void;
};

type SelectButtonProps = {
  handleButtonClick: () => void;
};

export function TextEntry({ label, value, onChangeText }: AuthTextEntryProps) {
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

function SelectButton({ handleButtonClick }: SelectButtonProps) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <THIText style={styles.buttonLabel}>Get Started</THIText>
      </TouchableOpacity>
    </View>
  );
}

export function ProfileCard({
  first_name,
  last_name,
  username,
  id,
  emoji,
  isSelected,
  chooseProfile,
}: ProfileCardProps) {
  const firstNameWithLastInitial = `${first_name} ${last_name.charAt(0)}.`;
  return (
    <View style={styles.cardWrapper}>
      <Pressable
        onPress={() => chooseProfile(id)}
        style={({ pressed }) => [
          styles.card,
          isSelected && styles.selectedCard,
          pressed && styles.pressedCard,
        ]}
      >
        <View style={styles.imageContainer}>
          <THIText style={styles.emoji}>{emoji}</THIText>
        </View>
      </Pressable>
      <THIText style={styles.title}>{username}</THIText>
      <THIText style={styles.name}>{firstNameWithLastInitial}</THIText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 60,
    margin: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 60,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: 1000,
    paddingBottom: 10,
  },
  header: {
    fontWeight: 600,
    fontSize: 28,
  },
  subheader: {
    fontWeight: "bold",
    fontSize: 15,
  },
  input: {
    borderColor: "#95D0E7",
    borderWidth: 2,
    padding: 8,
    paddingLeft: 20,
    marginVertical: 20,
    borderRadius: 28,
    fontWeight: 400,
    color: "#6D6D6D",
    backgroundColor: "#FFFFFF",
    width: 474,
    height: 48,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    width: "100%",
    minHeight: "100%",
  },
  profileContainer: {
    width: 1100,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 1000,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#0000004D",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    width: 150,
  },
  buttonLabel: {
    color: "black",
  },
  cardWrapper: {
    width: 225,
    alignItems: "center",
    margin: 10,
  },
  card: {
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    margin: 10,
    borderRadius: 70,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emoji: {
    fontSize: 60,
  },
  titleContainer: {
    flex: 1.1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    marginVertical: 5,
    textAlign: "center",
  },
  selectedCard: {
    borderColor: "#95D0E7",
    backgroundColor: "#95D0E7",
    shadowColor: "#000",
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
    color: "#007AFF",
    fontWeight: "600",
  },
  name: { color: "#6D6D6D", fontSize: 18, marginTop: 5 },
});
