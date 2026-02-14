import {
    Pressable,
    type PressableProps,
    StyleSheet
} from "react-native";

import { COLORS, FONT_SIZES } from "@/styles/theme";
import { BodyText } from "../shared/text";



type Props = PressableProps & {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg";
};

export const Button = ({ children, variant = "primary", size = "md", ...props }: Props) => {
    const { style: buttonStyle, ...restButtonProps } = props ?? {};

    const shouldWrapText =
        typeof children === "string" || typeof children === "number";

    return (
        <Pressable style={(state) => [
            styles.button,
            styles[size],
            styles[variant],
            state.pressed && styles[`${variant}Pressed`],
            typeof buttonStyle === "function" ? buttonStyle(state) : buttonStyle,
        ]} {...restButtonProps}>
            {shouldWrapText ? <BodyText style={[styles[`${variant}Text`]]}>{children}</BodyText> : children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        fontSize: FONT_SIZES.lg,
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    // variants
    primary: {
        backgroundColor: COLORS.dark.primary,
    },
    primaryText: {
        color: COLORS.dark["primary-foreground"],
    },
    primaryPressed: {
        backgroundColor: `${COLORS.dark.primary}E6`,
    },

    secondary: {
        backgroundColor: COLORS.dark.secondary,
    },
    secondaryText: {
        color: COLORS.dark.primary,
    },
    secondaryPressed: {
        backgroundColor: `${COLORS.dark.secondary}E6`,
    },

    outline: {
        borderWidth: 1,
        borderColor: COLORS.dark.primary,
    },
    outlineText: {
        color: COLORS.dark.primary,
    },
    outlinePressed: {
        backgroundColor: `${COLORS.dark.primary}E6`,
    },

    ghost: {
    },
    ghostText: {
        color: COLORS.dark.primary,
    },
    ghostPressed: {
        opacity: 0.8
    },
    destructive: {
        backgroundColor: COLORS.dark.error,
    },
    destructiveText: {
        color: COLORS.dark.white,
    },
    destructivePressed: {
        backgroundColor: `${COLORS.dark.error}E6`,
    },

    // sizes
    lg: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 40,
        fontSize: FONT_SIZES.xl,
        fontWeight: "600"
    },
    md: {
        fontSize: FONT_SIZES.lg,
        fontWeight: "600",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    sm: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
    },
    "icon-sm": {
        width: 32,
        height: 32,
        padding: 6,
        borderRadius: "100%",
    },
    "icon-md": {
        width: 40,
        height: 40,
        padding: 8,
        borderRadius: "100%",
    },
    "icon-lg": {
        width: 48,
        height: 48,
        padding: 12,
        borderRadius: "100%",
    },
});
