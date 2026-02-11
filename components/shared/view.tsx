import type { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";
import { COLORS } from "@/styles/theme";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function CustomView({
    style,
    lightColor = COLORS.dark.background,
    darkColor = COLORS.dark.background,
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background",
    );

    return <SafeAreaView edges={["top", "left", "right"]}
        style={[{ flex: 1, backgroundColor }, style]} {...otherProps} />;
}
