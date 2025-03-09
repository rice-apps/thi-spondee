import { LogOutModal } from "@/components/navigation/LogOutModal";
import { SideTabBar } from "@/components/navigation/SideTabBar";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from "@/lib/supabase";
import { router, Tabs } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handle the logout after clicking log out tab button
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          // Hide the default tab bar completely
          tabBarStyle: { display: "none" },
        }}
        // The custom tab bar will handle everything
        tabBar={(props) => (
          <SideTabBar
            {...props}
            customActions={{
              empty: handleLogout,
            }}
          />
        )}
      >
        {/* Dashboard */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* Testing */}
        <Tabs.Screen
          name="selection"
          options={{
            title: "Testing",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "headset" : "headset-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* Profiles */}
        <Tabs.Screen
          name="profiles"
          options={{
            title: "Profiles",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
          }}
        />

        {/* Log out button */}
        <Tabs.Screen
          name="empty"
          options={{
            title: "Log Out",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "log-out" : "log-out-outline"}
                color={color}
              />
            ),
            // This marks it as an action tab
            customAction: true,
            style: { marginTop: 300 },
          }}
        />

        {/* Index (hidden) */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarButton: () => null, // Hide the tab
          }}
        />

        {/* Settings modal (hidden) */}
        <Tabs.Screen
          name="settings"
          options={{
            tabBarButton: () => null, // Hide the tab
          }}
        />

        {/* Input session notes screen (hidden) */}
        <Tabs.Screen
          name="inputSessionNotes"
          options={{
            tabBarButton: () => null, // Hide the tab
          }}
        />
      </Tabs>
      <LogOutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            Alert.alert("Logout Error", error.message);
            return;
          }
          router.push("/login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Force the container to take up the full screen
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
