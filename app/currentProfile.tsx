import { supabase } from "../lib/supabase";

export const userData = {
  CURRENT_ID: "placeholder",
  FIRST_NAME: "placeholder",
  LAST_NAME: "placeholder",
  USERNAME: "placeholder",
  EMOJI: "placeholder",
};

export const setCurrentID = async (id) => {
  userData.CURRENT_ID = id;
  await fetchUserData(id);
};

export const fetchUserData = async (id) => {
  const { data, error } = await supabase
    .from("children") 
    .select("first_name, last_name, username, emoji")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return;
  }

  if (data) {
    userData.FIRST_NAME = data.first_name;
    userData.LAST_NAME = data.last_name;
    userData.USERNAME = data.username;
    userData.EMOJI = data.emoji;
    console.log("User data updated:", userData);
  }
};