import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "@/styles/theme";

import { Button } from "../ui/button";
import { BodyText } from "./text";

export function Nav({
    title,
    onBack,
    onSearch,
}: {
    title?: string;
    onBack?: () => void;
    onSearch?: () => void;
}) {
    return (
        <View style={styles.nav}>
            {onBack && <Pressable onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color={COLORS.dark.white} />
            </Pressable>}

            {title && <BodyText style={styles.navText}>{title}</BodyText>}

            {onSearch && <Button size="icon-sm" onPress={onSearch}>
                <SimpleLineIcons name="magnifier" size={18} color="black" />
            </Button>}
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    navText: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "bold",
        color: COLORS.dark.primary,
    },
})