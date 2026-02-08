import { StyleSheet, Text, type TextProps } from "react-native";

import { COLORS, FONT_SIZES, SPACING } from "@/styles/theme";

export const Heading = ({ children, style, ...props }: TextProps) => (
    <Text style={[styles.heading, style]} {...props}>
        {children}
    </Text>
);
export const Subheading = ({ children, style, ...props }: TextProps) => (
    <Text style={[styles.subheading, style]} {...props}>
        {children}
    </Text>
);
export const BodyText = ({ children, style, ...props }: TextProps) => (
    <Text style={[styles.body, style]} {...props}>
        {children}
    </Text>
);
const styles = StyleSheet.create({
    heading: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: "bold",
        color: COLORS.dark.white,
        marginBottom: SPACING.sm,
    },
    subheading: {
        fontSize: FONT_SIZES.lg,
        fontWeight: "500",
        color: COLORS.dark.white,
        marginBottom: SPACING.sm,
    },
    body: {
        fontSize: FONT_SIZES.md,
        color: COLORS.dark.white,
    },
});
