import {Pressable, View, Text, StyleSheet} from "react-native";
import {
  NavigationHelpers,
  NavigationState,
  ParamListBase,
  TabActions,
} from "@react-navigation/native";
import {BottomTabNavigationEventMap} from "@react-navigation/bottom-tabs";

interface SideTabBarProps {
  state: NavigationState;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  descriptors: { [key: string]: any };
  customActions?: { [key: string]: () => void };
}

export function SideTabBar({
                             state,
                             navigation,
                             descriptors,
                             customActions = {},
                           }: SideTabBarProps) {
  const screensWithoutNavbar: string[] = ["login"];

  const currentRoute = state.routes[state.index]?.name;
  if (screensWithoutNavbar.includes(currentRoute)) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sideTabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          // Skip rendering if tabBarButton is provided (used to hide the tab)
          if (options.tabBarButton) {
            return null;
          }

          // Handle custom action tabs
          const isActionTab = options.customAction;
          const customAction = customActions[route.name];

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (isActionTab && customAction) {
                  // Execute custom action instead of navigation
                  customAction();
                  return;
                }

                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.dispatch({
                    ...TabActions.jumpTo(route.name, route.params),
                    target: state.key,
                  });
                }
              }}
              style={[
                styles.tabButton,
                isFocused && !isActionTab && styles.activeTab,
                options.style,
              ]}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused && !isActionTab,
                  color: isFocused && !isActionTab ? "#000" : "#666",
                  size: 24,
                })}
              <Text
                style={[
                  styles.tabText,
                  isFocused && !isActionTab && styles.activeTabText,
                ]}
              >
                {options.title ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.mainContent}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sideTabBar: {
    width: 105,
    backgroundColor: "#fff",
    borderRightWidth: 2,
    borderColor: "#f6f6f6",
    paddingTop: 20,
  },
  tabButton: {
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#e0e0e0",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "inter",
    color: "#17262B",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "500",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
