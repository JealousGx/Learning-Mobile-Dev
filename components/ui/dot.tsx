import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/styles/theme";

export const Dot = ({ active }: { active: boolean }) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(active ? 24 : 8, { duration: 250 }),
            backgroundColor: withTiming(
                active ? COLORS.dark.primary : COLORS.dark["secondary-foreground"],
                { duration: 250 }
            ),
        };
    });

    return (
        <Animated.View
            style={[
                {
                    height: 8,
                    borderRadius: 4,
                },
                animatedStyle,
            ]}
        />
    );
};
