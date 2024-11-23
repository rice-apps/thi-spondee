import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SideTabBar } from "@/components/navigation/SideTabBar";
import { View, Text, StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
        tabBar={(props) => <SideTabBar {...props} />}
      >
        {/* Login page (hidden) */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarButton: () => null, // Hide the tab
          }}
        />

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
          name="testing"
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

        {/* Logout */}
        <Tabs.Screen
          name="authScreen"
          options={{
            title: "Logout",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={"log-out-outline"} color={color} />
            ),
            style: { marginTop: 300 },
          }}
        />

        {/* Settings modal (hidden) */}
        <Tabs.Screen
          name="settings"
          options={{
            tabBarButton: () => null, // Hide the tab
          }}
        />

        {/* Test screen (hidden) */}
        <Tabs.Screen
          name="testScreen"
          options={{
            tabBarButton: () => null, // Hide the tab
          }}
        />
      </Tabs>
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
