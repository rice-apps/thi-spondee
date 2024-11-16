import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import {
  NavigationHelpers,
  NavigationState,
  ParamListBase,
  TabActions,
} from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

interface SideTabBarProps {
  state: NavigationState;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  descriptors: { [key: string]: any };
}

export function SideTabBar({ state, navigation, descriptors }: SideTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sideTabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
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
              style={[styles.tabButton, isFocused && styles.activeTab]}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? '#000' : '#666',
                  size: 24,
                })
              }
              <Text style={[
                styles.tabText,
                isFocused && styles.activeTabText
              ]}>
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
    flexDirection: 'row',
    // Ensure the tab bar container takes up the full screen
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  sideTabBar: {
    width: 100,
    backgroundColor: '#f4f4f4',
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingTop: 20,
  },
  tabButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
