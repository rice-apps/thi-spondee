import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function AddProfile() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  // State to store only the currently selected emoji
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Function to update the selected emoji (only one at a time)
  const handlePress = (emoji) => {
    setSelectedEmoji(emoji); // Update state to only store the last pressed emoji
  };

  const fetchChildren = async () => {
    const { data, error } = await supabase.from("children").insert({
      first_name: text.split(" ")[0],
      last_name: text.split(" ")[1],
      username: text2,
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
          <Text style={styles.textStyle}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
          ></TextInput>
          <Text style={styles.textStyle}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setText2}
            value={text2}
          ></TextInput>
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
    aspectRatio: 1 / 1,
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
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Inter",
    fontStyle: "normal",
    marginTop: 40,
    alignSelf: "stretch",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    height: 50,
    width: 300,
    alignSelf: "stretch",
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
