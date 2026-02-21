import { StyleSheet, type Text } from "react-native";

import { COLORS } from "@/styles/theme";

import { BodyText } from "../shared/text";

type Props = {
    label: string;
    required?: boolean;
    labelProps?: Text["props"];
};

export function Label({ label, required, labelProps }: Props) {
    const { style: labelStyle, ...restLabelProps } = labelProps ?? {};


    return (
        <BodyText {...restLabelProps} style={[styles.label, labelStyle]}>
            {label}

            {required && (
                <BodyText style={{ color: COLORS.dark.error, marginLeft: 4 }}>
                    *
                </BodyText>
            )}
        </BodyText>
    );
}

const styles = StyleSheet.create({
    label: {
        color: COLORS.dark.white,
    },
})