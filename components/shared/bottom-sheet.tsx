import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Pressable,
    View,
} from "react-native";

import { COLORS, SPACING } from "@/styles/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

export function BottomSheet({
    children,
    visible = false,
    onClose,
}: {
    children: React.ReactNode;
    visible: boolean;
    onClose?: () => void;
}) {
    const [isMounted, setIsMounted] = useState(visible);

    const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setIsMounted(true);

            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0.5,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: SHEET_HEIGHT,
                    duration: 350,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsMounted(false);
            });
        }
    }, [visible]);

    if (!isMounted) return null;

    return (
        <Modal transparent visible animationType="none">
            <View style={{ flex: 1 }}>
                {/* Backdrop */}
                <Pressable style={{ flex: 1 }} onPress={onClose}>
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: "black",
                            opacity: backdropOpacity,
                        }}
                    />
                </Pressable>

                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: SHEET_HEIGHT,
                        backgroundColor: COLORS.dark.background,
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        padding: SPACING.xl,
                        transform: [{ translateY }],
                        flex: 1,
                        gap: 32,
                    }}
                >
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
}
