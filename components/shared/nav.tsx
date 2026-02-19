import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "@/styles/theme";

import { Button } from "../ui/button";
import { BodyText } from "./text";

export function Nav({
    title,
    onBack,
    onSearch,
    rightComponent,
}: {
    title?: string;
    onBack?: () => void;
    onSearch?: () => void;
    rightComponent?: React.ReactNode;
}) {
    const shouldCenterTitle = onBack && !onSearch && !rightComponent;

    return (
        <View style={styles.nav}>
            <View style={styles.side}>
                {onBack && (
                    <Pressable onPress={onBack}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.dark.white}
                        />
                    </Pressable>
                )}
            </View>

            {title && <BodyText style={[styles.navText, shouldCenterTitle && styles.centeredTitle]}>{title}</BodyText>}

            <View style={styles.side}>
                {rightComponent ? (
                    rightComponent
                ) : onSearch ? (
                    <Button size="icon-sm" onPress={onSearch}>
                        <SimpleLineIcons
                            name="magnifier"
                            size={18}
                            color={COLORS.dark.white}
                        />
                    </Button>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    side: {
        alignItems: "center",
        justifyContent: "center",
    },
    navText: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "bold",
        color: COLORS.dark.primary,
    },
    centeredTitle: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
    },
})