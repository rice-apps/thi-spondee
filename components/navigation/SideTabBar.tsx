import {Pressable, View, Text} from "react-native";
import {
  NavigationHelpers,
  NavigationState,
  ParamListBase,
  TabActions
} from "@react-navigation/native";
import {BottomTabNavigationEventMap} from "@react-navigation/bottom-tabs";

interface SideTabBarProps {
  state: NavigationState; // This represents the navigation state
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>; // Navigation prop for handling navigation actions
  descriptors: { [key: string]: any }; // Descriptors for the routes
}

export function SideTabBar({state, navigation, descriptors}: SideTabBarProps) {
  return (
    <View style={[{flexDirection: 'row'}]}>
      {state.routes.map((route, index) => (
        <Pressable
          key={route.key}
          onPress={() => {
            const isFocused = state.index === index;
            const event = navigation.emit({
              type: 'tabPress',
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
          style={{flex: 1}}
        >
          <Text>{descriptors[route.key].options.title ?? route.name}</Text>
        </Pressable>
      ))}
    </View>
  )
}