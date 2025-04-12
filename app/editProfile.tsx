import { DeleteProfileModal } from "@/components/DeleteProfileModal";
import { THIText } from "@/components/THIText";
import { fetchUserData, userData } from "@/lib/currentProfile";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function EditProfile() {
  const [selectedEmoji, setSelectedEmoji] = useState(userData.EMOJI);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  // Function to update the selected emoji (only one at a time)
  const handlePress = (emoji: string) => {
    setSelectedEmoji(emoji); // Update state to only store the last pressed emoji
  };

  const updateProfile = async () => {
    const { data, error } = await supabase
      .from("anonymized_children")
      .update({
        emoji: selectedEmoji,
      })
      .eq("id", userData.CURRENT_ID);
    if (error) {
      console.error(error);
    }
    await fetchUserData(userData.CURRENT_ID);
    router.push("/(tabs)/home");
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

      const sessionIds = sessions.map((session) => session.id);

      if (sessionIds.length > 0) {
        const { error: deleteSettingsError } = await supabase
          .from("test_session_settings")
          .delete()
          .in("id", sessionIds);

        if (deleteSettingsError) {
          throw deleteSettingsError;
        }

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
        .from("anonymized_children")
        .delete()
        .eq("id", currentUserId);

      if (deleteProfileError) {
        throw deleteProfileError;
      }

      console.log(
        `Profile with ID ${currentUserId}, related test sessions, test trials, and test session settings deleted successfully.`
      );

      router.push("/profilePicker");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.leftGroup}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome name="angle-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headingStyle}>Edit Profile</Text>
        </View>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => setDisplayConfirmationModal(!displayConfirmationModal)}
        >
          <THIText style={{ color: "white" }}>Delete Profile</THIText>
        </TouchableOpacity>
      </View>
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
                <Text style={styles.profileEmojiStyle}>{selectedEmoji}</Text>
              </View>
            </View>
            <Text style={styles.textStyle}>Username</Text>
            <View style={styles.username}>
              <Text
                style={styles.input}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.5}
                disabled
              >
                {userData.USERNAME}
              </Text>
            </View>
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
            onPress={() => updateProfile()}
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
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DeleteProfileModal
        displayModal={displayConfirmationModal}
        setDisplayModal={setDisplayConfirmationModal}
        deleteProfile={deleteProfile}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    flexDirection: "row",
    display: "flex",
    gap: 5,
  },
  undoButton: {
    marginTop: 20,
    padding: 10,
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
  delete: {
    backgroundColor: "#DC4731",
    borderRadius: 100,
    padding: 15,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // adjust spacing here if needed
  },
  backButton: {
    marginTop: 2,
  },
});
