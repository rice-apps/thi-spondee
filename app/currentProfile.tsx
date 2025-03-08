import { supabase } from "../lib/supabase";

export const userData = {
  CURRENT_ID: "placeholder",
  USERNAME: "placeholder",
  EMOJI: "placeholder",
};

export const setCurrentID = async (id: string) => {
  userData.CURRENT_ID = id;
  await fetchUserData(id);
};

export const fetchUserData = async (id: string) => {
  const { data, error } = await supabase
    .from("anonymized_children")
    .select("username, emoji")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return;
  }

  if (data) {
    userData.USERNAME = data.username;
    userData.EMOJI = data.emoji;
    console.log("User data updated:", userData);
  }
};

export const fetchGuestData = async () => {
  const { data, error } = await supabase
    .from("anonymized_children")
    .select("username, emoji")
    .eq("emoji", "👤")
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return;
  }

  if (data) {
    userData.USERNAME = data.username;
    userData.EMOJI = data.emoji;
    console.log("User data updated:", userData);
  }
};
