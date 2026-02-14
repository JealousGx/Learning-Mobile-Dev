import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";

import { BORDER_RADIUS, COLORS } from "@/styles/theme";

export default function Layout() {
    return (
        <View style={{ height: "100%", backgroundColor: COLORS.dark.background }}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: COLORS.dark.primary,
                    tabBarInactiveTintColor: COLORS.dark["secondary-foreground"],
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarButton: HapticTab,
                    tabBarStyle: {
                        height: 82,
                        borderTopWidth: 0,
                        borderTopLeftRadius: BORDER_RADIUS.xl,
                        borderTopRightRadius: BORDER_RADIUS.xl,
                        backgroundColor: COLORS.dark.secondary,
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        overflow: "hidden",
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home" size={28} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="products/index"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="unordered-list" size={28} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="cart"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="shopping-cart" size={24} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="favourites"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Fontisto name="favorite" size={28} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person" size={28} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="search"
                    options={{
                        href: null
                    }}
                />
            </Tabs>
        </View>
    );
}
