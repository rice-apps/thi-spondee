import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import {useEffect, useState} from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const transportationMethods: string[] = [
  "Bicycle", "Coach", "Tuk-Tuk", "Cablecar", "Skateboard", "Aeroplane", "Dunebuggy",
  "Rig", "Buggy", "Yacht", "Ferry", "Tram", "Gondola", "Cruiseship",
  "Train", "Airboat", "Car", "Hovercraft", "Sleigh",
  "Helicopter", "Submarine", "Sled", "Truck", "Unicycle", "Parachute",
  "Sailboat", "Canoe", "Snowmobile", "Segway",
  "Rickshaw", "Scooter", "Taxi", "Tractor", "Jetski",
  "Blimp", "Hotairballoon", "Paraglider", "Kayak", "Rowboat", "Trolley", "Bus", "Minivan", "Convertible",
  "Sedan", "Pickuptruck", "Streetcar", "Glider", "Spaceship", "Spaceshuttle", "Spacestation",
  "Limousine", "Doubledeckerbus", "Ambulance", "Firetruck",
  "Snowcoach", "Barge", "Ship", "Ferry", "Riverboat", "Locomotive", "Jeep", "Jet"
];

const animals: string[] = [
  "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Baboon",
  "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly",
  "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Cheetah", "Chicken", "Chimpanzee",
  "Chinchilla", "Clam", "Cobra", "Cockroach", "Cod", "Coyote", "Crab", "Crane", "Crocodile", "Crow",
  "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Donkey", "Dove", "Dragonfly", "Duck", "Dugong",
  "Eagle", "Echidna", "Eel", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish",
  "Flamingo", "Fly", "Fox", "Frog", "Gazelle", "Gerbil", "Giraffe", "Goat", "Goldfish", "Goose",
  "Gorilla", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron",
  "Herring", "Hippopotamus", "Hornet", "Horse", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar",
  "Jellyfish", "Magpie", "Kangaroo", "Koala", "Komodo", "Kouprey", "Kudu", "Lark", "Lemur", "Leopard", "Lion", "Unicorn", "Yak"
];


export default function AddProfile() {
  const [username, setUsername] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🐶");

  function generateRandomUsername(animals: string[], vehicles: string[]): string {
    // Select a random animal
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

    // Select a random vehicle
    const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];

    // Combine all parts and return
    return `${randomAnimal}${randomVehicle}`;
  }

  const checkAndGenerateUsername = async () => {
    let isUnique = false;
    let newUsername = "";

    while (!isUnique) {
      newUsername = generateRandomUsername(transportationMethods, animals);

      // Check if username exists in the database
      const { data, error } = await supabase
          .from("anonymized_children")
          .select("username")
          .eq("username", newUsername)
          .single();

      if (error || !data) {
        // Unique username
        isUnique = true;
      }
    }
    setUsername(newUsername);
  };

  // Call this function when component mounts
  useEffect(() => {
    checkAndGenerateUsername();
  }, []);

  // Function to update the selected emoji (only one at a time)
  const handlePress = (emoji:string) => {
    setSelectedEmoji(emoji); // Update state to only store the last pressed emoji
  };

  const fetchChildren = async () => {
    const { data, error } = await supabase.from("anonymized_children").insert({
      username: username,
      emoji: selectedEmoji,
    });
    if (error) {
      console.error(error);
    } else if (data) {
      // setChildren(data);
      // setFilteredChildren(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingStyle}>Add Profile</Text>
      <View style={{ flexDirection: "row", display: "flex", gap: 80 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.image}>
            <View
              style={{
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedEmoji ? (
                <Text style={styles.profileEmojiStyle}>{selectedEmoji}</Text>
              ) : (
                <Image
                  source={require("../assets/images/blackadd.png")}
                  style={{ width: 60, height: 60 }}
                />
              )}
            </View>
          </View>
          <Text style={styles.textStyle}>Username</Text>
          <Text
              style={styles.input}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.5}
          >
            {username}
          </Text>
        </View>
        {/*----EMOJIS---- i'm not gonna comment on this below 
        but we should probably make this not hard coded at some point*/}
        <View
          style={{
            marginTop: 60,
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "column",
            marginLeft: "auto",
          }}
        >
          <View style={{ flexDirection: "row", gap: 25 }}>
            <TouchableOpacity
              style={
                selectedEmoji === "🐶"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐶")}
            >
              <Text style={styles.emojiStyle}>🐶</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🐱"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐱")}
            >
              <Text style={styles.emojiStyle}>🐱</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🐰"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐰")}
            >
              <Text style={styles.emojiStyle}>🐰</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🐻"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐻")}
            >
              <Text style={styles.emojiStyle}>🐻</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🐼"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐼")}
            >
              <Text style={styles.emojiStyle}>🐼</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 25, gap: 25 }}>
            <TouchableOpacity
              style={
                selectedEmoji === "🦁"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🦁")}
            >
              <Text style={styles.emojiStyle}>🦁</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🐸"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐸")}
            >
              <Text style={styles.emojiStyle}>🐸</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🐢"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🐢")}
            >
              <Text style={styles.emojiStyle}>🐢</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🦈"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🦈")}
            >
              <Text style={styles.emojiStyle}>🦈</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🦄"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🦄")}
            >
              <Text style={styles.emojiStyle}>🦄</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 25, gap: 25 }}>
            <TouchableOpacity
              style={
                selectedEmoji === "🦖"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🦖")}
            >
              <Text style={styles.emojiStyle}>🦖</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🤖"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🤖")}
            >
              <Text style={styles.emojiStyle}>🤖</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "💩"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("💩")}
            >
              <Text style={styles.emojiStyle}>💩</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🍕"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🍕")}
            >
              <Text style={styles.emojiStyle}>🍕</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🎵"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🎵")}
            >
              <Text style={styles.emojiStyle}>🎵</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 25, gap: 25 }}>
            <TouchableOpacity
              style={
                selectedEmoji === "🌱"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🌱")}
            >
              <Text style={styles.emojiStyle}>🌱</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🌸"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🌸")}
            >
              <Text style={styles.emojiStyle}>🌸</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🌈"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🌈")}
            >
              <Text style={styles.emojiStyle}>🌈</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🏎️"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🏎️")}
            >
              <Text style={styles.emojiStyle}>🏎️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedEmoji === "🚀"
                  ? styles.blueSmallCircle
                  : styles.smallCircle
              }
              onPress={() => handlePress("🚀")}
            >
              <Text style={styles.emojiStyle}>🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*----Save Button----*/}
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={async () => {
            await fetchChildren();
            router.push("/profilePicker");
          }}
        >
          <Text
            style={{
              color: "#17262B",
              fontSize: 20,
              fontWeight: "500",
              textAlign: "center",
              fontFamily: "Inter",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
  },
  image: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 180,
    height: 180,
    aspectRatio: 1,
    marginTop: 80,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingStyle: {
    fontSize: 28,
    color: "black",
    fontStyle: "normal",
    fontFamily: "Inter",
    fontWeight: "600",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 500,
    fontFamily: "Inter",
    fontStyle: "normal",
    marginTop: 40,
    alignSelf: "stretch",
  },
  input: {
    minWidth: 0,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    height: 50,
    width: 300,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  buttonStyle: {
    width: 326,
    height: 54,
    padding: 10,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#95D0E7",
    marginTop: 20,
  },
  smallCircle: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 85,
    height: 85,
  },
  blueSmallCircle: {
    backgroundColor: "#95D0E7",
    borderRadius: 100,
    width: 85,
    height: 85,
  },
  emojiStyle: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "Inter",
    margin: "auto",
  },
  profileEmojiStyle: {
    fontSize: 90,
    fontWeight: "600",
    fontFamily: "Inter",
    justifyContent: "center",
  },
});
