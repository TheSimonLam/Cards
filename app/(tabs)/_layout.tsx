import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: Colors["light"].footerBackgroundColor },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "earth" : "earth-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="buy"
        options={{
          title: "Buy",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="earn"
        options={{
          title: "Earn",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "extension-puzzle" : "extension-puzzle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="following"
        options={{
          title: "Following",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
